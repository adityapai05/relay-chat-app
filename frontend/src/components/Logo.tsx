import { useThemeStore } from "../store/useThemeStore";
import logo from '../assets/logo.png'
const Logo = () => {
  const { theme } = useThemeStore();
  
  const darkThemes = [
    "dark", "synthwave", "halloween", "black", "luxury", 
    "forest", "dracula", "business", "night", "coffee"
  ];

  const isDarkTheme = darkThemes.includes(theme);

  return (
    <img
      src={logo}
      className={isDarkTheme ? "" : "invert"}
      alt="Logo"
    />
  );
};

export default Logo;
