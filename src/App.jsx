import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterSidebar from "./components/FilterSidebar";
import ArtGrid from "./components/ArtGrid";
import Pagination from "./components/Pagination";
import { fetchPaintings } from "./services/api";
import { useDebounce } from "./hooks/useDebounce";
import "./App.css";

const ITEMS_PER_PAGE = 6;

// Вспомогательная функция для извлечения числа из года (если пришла строка)
const getYearNumber = (year) => {
  if (typeof year === "number") return year;
  if (typeof year === "string") {
    const match = year.match(/\d+/);
    return match ? parseInt(match[0], 10) : NaN;
  }
  return NaN;
};

function App() {
  const [allPaintings, setAllPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    artist: "",
    location: "",
    yearFrom: "",
    yearTo: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState("dark");

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Загрузка темы из localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setTheme("light");
      document.documentElement.classList.add("theme-light");
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("theme-light");
    }
  }, []);

  // Загрузка данных через API (извлекая пример из спецификации)
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchPaintings()
      .then((data) => {
        if (!cancelled) {
          setAllPaintings(data);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Фильтрация и поиск
  const filteredPaintings = useMemo(() => {
    const paintings = Array.isArray(allPaintings) ? allPaintings : [];
    let result = [...paintings];

    // Поиск по названию
    if (debouncedSearch) {
      result = result.filter((painting) =>
        painting.title?.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Фильтр по художнику
    if (filters.artist) {
      result = result.filter((painting) =>
        painting.artist?.toLowerCase().includes(filters.artist.toLowerCase())
      );
    }

    // Фильтр по локации
    if (filters.location) {
      result = result.filter((painting) =>
        painting.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Фильтр по году ОТ
    if (filters.yearFrom) {
      const fromYear = parseInt(filters.yearFrom, 10);
      if (!isNaN(fromYear)) {
        result = result.filter((painting) => {
          const paintingYear = getYearNumber(painting.year);
          return !isNaN(paintingYear) && paintingYear >= fromYear;
        });
      }
    }

    // Фильтр по году ДО
    if (filters.yearTo) {
      const toYear = parseInt(filters.yearTo, 10);
      if (!isNaN(toYear)) {
        result = result.filter((painting) => {
          const paintingYear = getYearNumber(painting.year);
          return !isNaN(paintingYear) && paintingYear <= toYear;
        });
      }
    }

    return result;
  }, [allPaintings, debouncedSearch, filters]);

  // Пагинация
  const totalPages = Math.ceil(filteredPaintings.length / ITEMS_PER_PAGE);
  const paginatedPaintings = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPaintings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPaintings, currentPage]);

  // Сброс страницы при изменении поиска/фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filters]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("theme-light");
    } else {
      document.documentElement.classList.remove("theme-light");
    }
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({ artist: "", location: "", yearFrom: "", yearTo: "" });
    setSearchQuery("");
  };

  if (loading) {
    return (
      <>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="main">
          <div className="container">
            <div className="text-center" style={{ padding: "100px 0" }}>
              Loading paintings...
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="main">
          <div className="container">
            <div className="text-center" style={{ padding: "100px 0", color: "red" }}>
              Error: {error}
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="main">
        <div className="container">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterClick={() => setIsFilterOpen(true)}
          />
          <ArtGrid paintings={paginatedPaintings} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      </main>
    </>
  );
}

export default App;