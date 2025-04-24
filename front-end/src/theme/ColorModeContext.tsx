import React, {
  createContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";

interface ContextProps {
  mode: "light" | "dark";
  toggleColorMode: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ColorModeContext = createContext<ContextProps>({
  mode: "dark",
  toggleColorMode: () => {},
});

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const savedMode = localStorage.getItem("colorMode");
    return (savedMode as "light" | "dark") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);
  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  const toggleColorMode = (_: React.ChangeEvent<HTMLInputElement>) => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
