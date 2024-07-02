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

  const dataFetched = data.length > 0;

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

        if (response.status == "200") {
          setLoading(false);
        }
        let datita = response.data.data.values;

        const arrayOfArrays = dumbData.map((obj) => [
          obj.id,
          obj.date_saved,
          obj.company,
          obj.position,
          obj.description,
          obj.location,
          obj.status,
          obj.date_applied,
          obj.rating,
        ]);

        datita.push(...arrayOfArrays);
        datita.push(...arrayOfArrays);

        setData(datita);
        // setData(response.data.data.values);
      } catch (err) {
        console.error("Error fetching spreadsheet data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getSpreadsheetData();
  }, [user]);

  const formatTableHeaders = (data) => {
    console.log(data[0]);
    return data[0].slice(1).map((header) => {
      return (
        <th className=" px-4 py-4 text-left " key={header}>
          {header.toUpperCase().replace("_", " ")}
        </th>
      );
    });
  };

  const formatTableRows = (data) => {
    return data.slice(1).map((row, rowIndex) => {
      return (
        <tr className="m-2 " key={rowIndex}>
          {row.slice(1).map((cell, cellIndex) => {
            let content = cell;
            if (cellIndex === 0 || cellIndex === 6) {
              content = new Date(Number(cell) * 1000).toLocaleDateString();
            }
            return (
              <td
                className="border-b border-light-gray py-4 px-4 "
                key={cellIndex}
              >
                {content}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  if (!user || !dataFetched) {
    return null;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">Loading</div>
    );
  }

  return (
    <section className="Dashboard">
      <div className="max-w-screen  ">
        <table className="pr-8  text-dark-slate-gray table-auto w-full rounded-t-xl">
          {/* <caption className="text-center text-sm font-light mb-4 caption-top">
            Job Applications
          </caption> */}
          <thead className=" sticky top-[10vh]  rounded-xl  bg-light-gray ">
            <tr className="">{dataFetched && formatTableHeaders(data)}</tr>
          </thead>
          <tbody>{dataFetched && formatTableRows(data)}</tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
