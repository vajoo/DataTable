import React from "react";
import { Navbar, Footer } from "./components/layout";
import { Table } from "./sections";
import { people, people_short } from "./constants";

function App() {
  return(
    <div className="p-4">
      {/* <Navbar /> */}
      <Table initialData={people_short} customColumnNames={{ name: "Full Name" }} rowsPerPage={20} />
      {/* <Footer /> */}
    </div>
  );
}

export default App