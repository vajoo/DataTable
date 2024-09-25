import React from "react";
import { Navbar, Footer } from "./components/layout";
import { Table2 } from "./sections";

function App() {
  return(
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Hello World!</h1>
      <Table2 />
      <Footer />
    </div>
  );
}

export default App