import { createTheme, ThemeOptions } from "@mui/material/styles";
import { blueGrey, red, amber } from "@mui/material/colors";

export const migrationColors = {
  blue: "#39519B",
  blueGrey: "rgba(36, 44, 68, 1)",
  darkBlue: "rgba(22, 36, 84, 1)",
  cyan: "#25B4C8",
  aqua: "rgba(58, 232, 227, 1)",
  lightBlue: "#6574A2",
  darkerCoral: "#E5655A",
  darkCyan:"#109DAC"
};

const theme: ThemeOptions = createTheme({
  palette: {
    primary: { main: migrationColors.darkCyan, light: migrationColors.cyan },
    secondary: blueGrey,
    error: { main: red[300], light: red[100] },
    warning: { main: "#ffc107", light: amber[100] },
  },
  typography: {
    fontFamily: "'Manrope', sans-serif",
    fontWeightLight: 300,
    fontWeightMedium: 400,
    fontWeightRegular: 300,
  },
  shape: {
    borderRadius: 2,
  },
});

export default theme;
