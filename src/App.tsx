import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyles } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

import { CyclesContextProvide } from "../contexts/index";
export function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <CyclesContextProvide>
            <Router />
          </CyclesContextProvide>
        </BrowserRouter>
        <GlobalStyles />
      </ThemeProvider>
    </>
  );
}
