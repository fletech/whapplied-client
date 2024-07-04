import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { SessionContext } from "../context/sessionContext";

const dumbData = [
  {
    id: "54g21dsdff4g5h6",
    date_saved: 1719447810,
    company: "InnovateTech",
    position: "Software Engineer",
    description: "Full stack developer",
    location: "Berlin, Germany",
    status: "",
    url: "https://www.innovatetech.com",
    date_applied: 1719386610,
    rating: 5,
  },
  {
    id: "67h32kfdbi9l8m7",
    date_saved: 1719447815,
    company: "CyberNet",
    position: "Data Analyst",
    description: "Full stack developer",
    location: "Amsterdam, Netherlands",
    status: "",
    url: "https://www.innovatetech.com",
    date_applied: 1719386615,
    rating: 3,
  },
  {
    id: "78j43lm2qwen3o8",
    date_saved: 1719447820,
    company: "QuantumSoft",
    position: "Back-end Dev",
    description: "Full stack developer",
    location: "Paris, France",
    status: "",
    url: "https://www.innovatetech.com",
    date_applied: 1719386620,
    rating: 4,
  },
  {
    id: "89k54no5pqwe6q9",
    date_saved: 1719447825,
    company: "FinTech Group",
    position: "DevOps Engineer",
    description: "Full stack developer",
    location: "Zurich, Switzerland",
    status: "",
    url: "https://www.innovatetech.com",
    date_applied: 1719386625,
    rating: 5,
  },
  {
    id: "90l65op8qweq7r0",
    date_saved: 1719447830,
    company: "NextGen Solutions",
    position: "UI/UX Designer",
    description: "Full stack developer",
    location: "Stockholm, Sweden",
    status: "",
    url: "https://www.innovatetech.com",
    date_applied: 1719386630,
    rating: 4,
  },
  {
    id: "12a23bcasdd5e6",
    date_saved: 1719447835,
    company: "AlphaTech",
    position: "Machine Learning Engineer",
    description: "Full stack developer",
    location: "London, UK",
    status: "",
    url: "https://www.innovatetech.com",
    date_applied: 1719386635,
    rating: 4,
  },
  {
    id: "23b34cd5asde6f7",
    date_saved: 1719447840,
    company: "GreenEnergy",
    position: "Sustainability Analyst",
    description: "Full stack developer",
    location: "Oslo, Norway",
    status: "",
    url: "https://www.innovatetech.com",
    date_applied: 1719386640,
    rating: 5,
  },
  {
    id: "34c45de6fasd7g8",
    date_saved: 1719447845,
    company: "HealthTech",
    position: "Full Stack Developer",
    description: "Full stack developer",
    location: "Madrid, Spain",
    status: "",
    url: "https://www.innovatetech.com",
    date_applied: 1719386645,
    rating: 3,
  },
  {
    id: "45d56ef7asd8h9",
    date_saved: 1719447850,
    company: "EduSoft",
    position: "Data Scientist",
    description: "Full stack developer",
    location: "Vienna, Austria",
    status: "",
    url: "https://www.innovatetech.com",
    date_applied: 1719386650,
    rating: 4,
  },
  {
    id: "56e67fgasdh9i0",
    date_saved: 1719447855,
    company: "AgroTech",
    position: "Blockchain Developer",
    description: "Full stack developer",
    location: "Helsinki, Finland",
    status: "",
    url: "https://www.innovatetech.com",
    date_applied: 1719386655,
    rating: 5,
  },
];

const Dashboard = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [rowClicked, setRowClicked] = useState("");
  const [tableHeaders, setTableHeaders] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([
    "url",
    "id",
    "date_saved",
    "description",
  ]);
  const [order, setOrder] = useState([
    "date_applied",
    "company",
    "position",
    "location",
    "status",
    "rating",
  ]);

  const dataFetched = data.length > 0;

  const useData = (headers, rawData) => {
    const filteredHeaders = headers
      .filter((header) => {
        return !hiddenItems.includes(header);
      })
      .map((headerLowCase) => headerLowCase.toUpperCase().replace("_", " "));

    const sortedData = rawData.map((row) => {
      const shownContent = {};
      const hiddenContent = {};
      Object.keys(row).forEach((key) => {
        let content = row[key];
        if (key === "date_saved" || key === "date_applied") {
          content = new Date(Number(row[key]) * 1000).toLocaleDateString();
        }
        if (hiddenItems.includes(key)) {
          hiddenContent[key] = content;
        } else {
          shownContent[key] = content;
        }
      });

      return { shownContent, hiddenContent };
    });

    return { filteredHeaders, sortedData };
  };

  const { filteredHeaders, sortedData } = useData(tableHeaders, data);

  console.log("filteredHeaders", filteredHeaders);
  console.log("sortedData", sortedData);

  useEffect(() => {
    if (!user) {
      return;
    }

    const getSpreadsheetData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/v1/auth/spreadsheet-data", {
          accessToken: user.accessToken,
          spreadSheetId: user.spreadSheetId,
        });

        // if (response.status == "200") {
        //   setLoading(false);
        // }

        // console.log(response);
        let datita = response.data.data;
        setTableHeaders(response.data.headers);

        datita.push(...dumbData);
        datita.push(...dumbData);

        setData(datita);
      } catch (err) {
        console.error("Error fetching spreadsheet data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getSpreadsheetData();
  }, [user]);

  const formatTableHeaders = () => {
    return filteredHeaders.map((header, cellIndex) => {
      // if (cellIndex === 7 || cellIndex === 0) {
      //   return null;
      // }
      return (
        <th className=" px-4 py-4 text-left z-20" key={header}>
          {header}
          {/* {header.toUpperCase().replace("_", " ")} */}
        </th>
      );
    });
  };

  const formatTableRows = () => {
    return sortedData.map((rowData, rowIndex) => {
      return (
        <>
          <tr
            className={`m-2  relative h-full hover:bg-dark-sea-logo  cursor-pointer ${
              rowClicked === rowData.hiddenContent.id ? "bg-dark-sea-logo" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (rowClicked === rowData.hiddenContent.id) {
                setRowClicked("");
                return;
              }
              setRowClicked(rowData.hiddenContent.id);
            }}
            key={rowIndex}
          >
            {Object.keys(rowData.shownContent).map((cellHeader) => {
              let content = rowData.shownContent[cellHeader];

              if (cellHeader === "company") {
                return (
                  <td
                    className="group border-b border-light-gray bg-light-sea-logo "
                    key={cellHeader}
                  >
                    <a
                      href={rowData.hiddenContent.url}
                      target="_blank"
                      className="group-hover:text-custom-blue flex items-center py-4 px-4 w-full h-full"
                    >
                      {content}
                      <span className="group-hover:opacity-100 opacity-0 ml-2 -rotate-45">
                        {"->"}
                      </span>
                    </a>
                  </td>
                );
              }

              return (
                <td
                  className={`border-b border-light-gray py-4 px-4 ${
                    cellHeader == "rating" || cellHeader == "date_applied"
                      ? "text-center"
                      : "text-left"
                  }`}
                  key={cellHeader}
                >
                  {content}
                </td>
              );
            })}
            {/* <a
            href={rowData.hiddenContent.url}
            className="w-[40px] flex items-center justify-center bg-light-gray h-[40px] absolute top-[15%] -left-10 rounded-full "
          >
            {"->"}
          </a> */}
          </tr>
          {
            //corregir esto
            // rowClicked === rowData.hiddenContent.id && (
            //   <div className=" bg-dark-gray px-8  z-30 left-0">
            //     <div className="absolute left-0 w-full bg-dark-slate-gray z-30 h-[50vh]">
            //       {rowData.hiddenContent.description}
            //     </div>
            //   </div>
            // )
          }
        </>
      );
    });
  };

  if (!user || !dataFetched) {
    return null;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">{error}</div>
    );
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading</div>
    );
  }

  return (
    <section className="Dashboard">
      <div className="max-w-screen  ">
        <table className="pr-8 table-auto text-soft-black w-full rounded-sm border-collapse relative">
          {/* <caption className="text-center text-sm font-light mb-4 caption-top">
            Job Applications
          </caption> */}
          <thead className=" sticky top-[10vh]  rounded-xl bg-light-gray z-10 opacity-90  border-b border-dark-cyan">
            <tr className="relative">{dataFetched && formatTableHeaders()}</tr>
          </thead>
          <tbody className="w-full relative">
            {dataFetched && formatTableRows()}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
