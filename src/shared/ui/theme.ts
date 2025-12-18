import { createTheme } from "@mui/material/styles";

const COLORS = {
  primary: "#76ECCC",
  text: "#122D3D",
  neutral: "#666666",
  fieldBg: "#F3F4F5",
  panelBg: "rgba(18,45,61,0.05)",
};

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: COLORS.primary },
    text: {
      primary: COLORS.text,
      secondary: COLORS.neutral,
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.fieldBg,
          borderRadius: 12,
        },
        notchedOutline: {
          borderColor: "rgba(18,45,61,0.15)",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: COLORS.neutral,
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-active": { color: COLORS.primary },
          "&.Mui-completed": { color: COLORS.primary },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

export const uiTokens = COLORS;
