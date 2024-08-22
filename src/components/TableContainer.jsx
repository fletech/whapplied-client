import { useContext } from "react";

import { SessionContext } from "../context/sessionContext";

import Table from "./Table";

import { TableContext } from "../context/tableContext";

const TableContainer = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const { pageFilter, tableData, loading } = useContext(TableContext);
  const resultsLength =
    pageFilter === "overview"
      ? tableData.sortedData?.length
      : tableData.filteredData?.length;

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">No user</div>
    );
  }

  return (
    <section className="Dashboard w-full ">
      <div className="max-w-screen  flex flex-col h-full w-full border-[1px] border-dark-gray py-8 rounded-xl shadow-sm bg-gainsboro">
        {/* <div className="mb-8 w-full flex items-center justify-start px-8">
          <input
            type="search"
            placeholder="Search"
            className="w-1/2 h-[40px] px-4 py-2 border-[1px] border-dark-gray rounded-lg"
            onChange={(e) => {
              console.log(e.target.value);
              tableData.setSearch = e.target.value;
            }}
          />
        </div> */}

        <Table />
        <small className=" mt-8 flex items-center ">
          {loading ? (
            <span className=" animate-ping size-2 rounded-full bg-custom-blue ml-2"></span>
          ) : (
            ""
          )}

          <span className="mx-4">
            {loading ? "Loading results" : `Showing ${resultsLength} results`}
          </span>
        </small>
      </div>
    </section>
  );
};

export default TableContainer;
