import React from "react";
import { Table } from "./sections";
import { people, people_short } from "./constants";

function App() {
  return(
    <div className="p-4">
      {/* <Navbar /> */}
      <Table initialData={people} customColumnNames={{ name: "Full Name" }} rowsPerPage={50} />
      {/* <Footer /> */}
    </div>
  );
}

export default App