import { createTheme, Grid, ThemeProvider } from "@mui/material";
import React, { useContext, useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from ".";
import Header from "./components/header/Header";
import Sidenav from "./components/sidenav/Sidenav";
const newTheme = createTheme({
  typography: {
    fontFamily: ["Lato"],
    body2: {
      fontSize: "12px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
export const GroupContext = React.createContext({
  activeGroup: {},
  setActiveGroup: () => {},
  refreshContextUi: () => {},
  showLoadingBar: Boolean,
  setShowLoadingBar: () => {},
});
function Main() {
  const [currentRoute, setCurrentRoute] = useState("forums");
  const [activeGroup, setActiveGroup] = useState({});
  const userContext = useContext(UserContext);
  const [refreshState, setRefreshState] = useState(true);
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const [openNavBar, setOpenNavBar] = useState(false);
  function refreshGroups() {
    setRefreshState(!refreshState);
  }
  useEffect(() => {
    if (sessionStorage.getItem("userContext") !== null) {
      if (Object.keys(userContext.currentUser).length) {
        sessionStorage.setItem("userContext", JSON.stringify(userContext));
      } else {
        let c = JSON.parse(sessionStorage.getItem("userContext"));
        userContext.setCurrentUser(c.currentUser);
      }
    } else {
      sessionStorage.setItem("userContext", JSON.stringify(userContext));
    }
  });

  useEffect(() => {
    if (sessionStorage.getItem("routeContext") !== null) {
      setCurrentRoute(sessionStorage.getItem("routeContext"));
    } else {
      sessionStorage.setItem("routeContext", currentRoute);
    }
  });
  return (
    <RouteContext.Provider
      value={{
        currentRoute: currentRoute,
        setCurrentRoute: setCurrentRoute,
        isNavigationBoxOpen: openNavBar,
        setIsNavigationBoxOpen: setOpenNavBar,
      }}
    >
      <GroupContext.Provider
        value={{
          activeGroup: activeGroup,
          setActiveGroup: setActiveGroup,
          refreshContextUi: refreshGroups,
          showLoadingBar,
          setShowLoadingBar,
        }}
      >
        <ThemeProvider theme={newTheme}>
          <div className="flex w-[100vw] fixed h-[65px] z-10">
            {/* <Header /> */}
          </div>

          <div className="flex flex-1 h-full customHeight mt-[65px]">
            <div className="flex-[.085] border-r-[1px] border-[#eeeeee]">
              <Sidenav />
            </div>
            <div className="flex-[.915]">
              <Outlet />
            </div>
          </div>
        </ThemeProvider>
      </GroupContext.Provider>
    </RouteContext.Provider>
  );
}

export const RouteContext = createContext({
  currentRoute: "",
  setCurrentRoute: () => {},
  isNavigationBoxOpen: Boolean,
  setIsNavigationBoxOpen: () => {},
});

export default Main;
