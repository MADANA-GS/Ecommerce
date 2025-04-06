import React, { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import ShowProduct from "./components/product/ShowProduct";
import { Route, Routes } from "react-router-dom";
import ProuductDeatilsPgae from "./components/product/ProuductDeatilsPgae";

const App = () => {
  // const { data } = useContext(AppContext);
  return <Routes>

    <Route path="/" element={<ShowProduct />} />
    <Route path="/product/:id" element={<ProuductDeatilsPgae />} />
  </Routes>;
};

export default App;
