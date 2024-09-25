import React from "react";
import { Navbar, Footer } from "./components/layout";
import { Table } from "./sections";

function App() {
  return(
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Hello World!</h1>
      <Table />
      <Footer />
    </div>
  );
}

export default App