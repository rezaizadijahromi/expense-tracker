import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { hot } from "react-hot-loader";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default hot(module)(App);
