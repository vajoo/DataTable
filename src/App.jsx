import React from "react";
import { Navbar, Footer } from "./components/layout";
import { Table } from "./sections";

function App() {
  return(
    <div className="p-4">
      {/* <Navbar /> */}
      <Table />
      {/* <Footer /> */}
    </div>
  );
}

export default App