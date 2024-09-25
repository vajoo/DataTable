import React from "react";
import { Navbar, Footer } from "./components/layout";
import { Table } from "./sections";

function App() {
  return(
    <div>
      <Navbar />
      <Table />
      <Footer />
    </div>
  );
}

export default App