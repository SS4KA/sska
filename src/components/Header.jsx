import React from "react";

const Header = ({ theme, toggleTheme }) => {
  const themeIcon = theme === "dark" 
    ? "./src/assets/light_icon_wh.svg" 
    : "./src/assets/dark_icon.svg";

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <button className="theme-btn" onClick={toggleTheme}>
            <img src={themeIcon} alt="theme_icon" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
