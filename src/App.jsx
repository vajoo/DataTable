import React from "react";
import { Navbar, Footer } from "./components/layout";
import { Table } from "./sections";
import { people } from "./constants";

function App() {
  return(
    <div className="p-4">
      {/* <Navbar /> */}
      <Table initialData={people} customColumnNames={{ name: "Full Name" }}/>
      {/* <Footer /> */}
    </div>
  );
}

export default App