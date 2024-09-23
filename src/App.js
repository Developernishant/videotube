import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Use BrowserRouter instead of createBrowserRouter
import Body from "./components/Body";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import SearchPage from "./components/SearchPage";
import WatchPage from "./components/WatchPage";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<MainContainer />} />
            <Route path="watch" element={<WatchPage />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
