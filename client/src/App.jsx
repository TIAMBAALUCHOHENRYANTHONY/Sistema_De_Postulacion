import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { MyRoutes } from "./routers/routes";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import { Inicio } from "./pages/Inicio";
import { Cedula } from "./pages/Cedula";



export const ThemeContext = React.createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  //const [sidebarOpen, setSidebarOpen] = useState(true);

  //const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Utilizamos el almacenamiento local para guardar el estado de sidebarOpen
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  // Utilizamos el almacenamiento local para guardar el estado de isAuthenticated
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedValue = localStorage.getItem("isAuthenticated");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  // Almacenamos el estado de sidebarOpen en el almacenamiento local cada vez que cambie
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  // Almacenamos el estado de isAuthenticated en el almacenamiento local cada vez que cambie
  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const handleAuthentication = (value) => {
    setIsAuthenticated(value);
  };

  return (
    <>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <BrowserRouter>
            {!isAuthenticated ? (
              <MyRoutes handleAuthentication={handleAuthentication} />
            ) : (
              <Container className={sidebarOpen ? "sidebarState active" : ""}>
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  handleAuthentication={handleAuthentication}
                />
                  <MyRoutes />
              </Container>
            )}
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition:all 0.3s ;
  &.active {
    grid-template-columns: 300px auto;
  }
  color:${({theme})=>theme.text};
`;
export default App;
