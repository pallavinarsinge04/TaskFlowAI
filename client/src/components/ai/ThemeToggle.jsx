import { useEffect, useState } from "react";
import {
  FaMoon,
  FaSun,
  FaDesktop,
} from "react-icons/fa";

function ThemeToggle() {
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");

    if (saved) return saved;

    return "system";
  };

  const [theme, setTheme] = useState(
    getInitialTheme()
  );

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove(
      "light-theme",
      "dark-theme"
    );

    if (theme === "dark") {
      root.classList.add("dark-theme");
    } else if (theme === "light") {
      root.classList.add("light-theme");
    } else {
      const prefersDark =
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

      root.classList.add(
        prefersDark
          ? "dark-theme"
          : "light-theme"
      );
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="theme-toggle">

      <button
        className={
          theme === "light"
            ? "active"
            : ""
        }
        onClick={() =>
          setTheme("light")
        }
        title="Light Mode"
      >
        <FaSun />
      </button>

      <button
        className={
          theme === "dark"
            ? "active"
            : ""
        }
        onClick={() =>
          setTheme("dark")
        }
        title="Dark Mode"
      >
        <FaMoon />
      </button>

      <button
        className={
          theme === "system"
            ? "active"
            : ""
        }
        onClick={() =>
          setTheme("system")
        }
        title="System Theme"
      >
        <FaDesktop />
      </button>

    </div>
  );
}

export default ThemeToggle;