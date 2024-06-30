import { useEffect, useState, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { SessionContext } from "../context/sessionContext";

// const dumbData = [
//   {
//     id: "54g21df4g5h6",
//     date_saved: 1719447810,
//     company: "InnovateTech",
//     position: "Software Engineer",
//     location: "Berlin, Germany",
//     date_applied: 1719386610,
//     rating: 5,
//   },
//   {
//     id: "67h32ki9l8m7",
//     date_saved: 1719447815,
//     company: "CyberNet",
//     position: "Data Analyst",
//     location: "Amsterdam, Netherlands",
//     date_applied: 1719386615,
//     rating: 3,
//   },
//   {
//     id: "78j43lm2n3o8",
//     date_saved: 1719447820,
//     company: "QuantumSoft",
//     position: "Back-end Dev",
//     location: "Paris, France",
//     date_applied: 1719386620,
//     rating: 4,
//   },
//   {
//     id: "89k54no5p6q9",
//     date_saved: 1719447825,
//     company: "FinTech Group",
//     position: "DevOps Engineer",
//     location: "Zurich, Switzerland",
//     date_applied: 1719386625,
//     rating: 5,
//   },
//   {
//     id: "90l65op8q7r0",
//     date_saved: 1719447830,
//     company: "NextGen Solutions",
//     position: "UI/UX Designer",
//     location: "Stockholm, Sweden",
//     date_applied: 1719386630,
//     rating: 4,
//   },
//   {
//     id: "12a23bc4d5e6",
//     date_saved: 1719447835,
//     company: "AlphaTech",
//     position: "Machine Learning Engineer",
//     location: "London, UK",
//     date_applied: 1719386635,
//     rating: 4,
//   },
//   {
//     id: "23b34cd5e6f7",
//     date_saved: 1719447840,
//     company: "GreenEnergy",
//     position: "Sustainability Analyst",
//     location: "Oslo, Norway",
//     date_applied: 1719386640,
//     rating: 5,
//   },
//   {
//     id: "34c45de6f7g8",
//     date_saved: 1719447845,
//     company: "HealthTech",
//     position: "Full Stack Developer",
//     location: "Madrid, Spain",
//     date_applied: 1719386645,
//     rating: 3,
//   },
//   {
//     id: "45d56ef7g8h9",
//     date_saved: 1719447850,
//     company: "EduSoft",
//     position: "Data Scientist",
//     location: "Vienna, Austria",
//     date_applied: 1719386650,
//     rating: 4,
//   },
//   {
//     id: "56e67fg8h9i0",
//     date_saved: 1719447855,
//     company: "AgroTech",
//     position: "Blockchain Developer",
//     location: "Helsinki, Finland",
//     date_applied: 1719386655,
//     rating: 5,
//   },
// ];

const Dashboard = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSpreadsheetData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await axios.post("/api/v1/auth/spreadsheet-data", {
          accessToken: user.accessToken,
          spreadSheetId: user.spreadSheetId,
        });

        console.log(response.data.data.values);
        setData(response.data.data.values);
      } catch (err) {
        console.error("Error fetching spreadsheet data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getSpreadsheetData();
  }, [user]);

  if (!user || loading) {
    return (
      <div className="flex justify-center items-center h-screen">Loading</div>
    );
  }

  if (data.length === 0 || loading) {
    return (
      <div className="flex justify-center items-center h-screen">Loading</div>
    );
  }

  return (
    <section>
      <div className="Dashboard">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
        <p>Email: {user.email}</p>
        {user.avatarUrl && (
          <img
            src={user.avatarUrl}
            alt="User Avatar"
            className="mt-4 rounded-full w-16 h-16"
          />
        )}
        {/* <p>{user.spreadSheetId}</p> */}
      </div>

      <div className="mt-8 ">
        <table border="1">
          <thead>
            <tr>
              {data &&
                data[0].slice(1).map((header) => {
                  return <th>{header}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.slice(1).map((row, rowIndex) => {
                return (
                  <tr key={rowIndex}>
                    {row.slice(1).map((cell, cellIndex) => {
                      let content = cell;
                      if (cellIndex === 0 || cellIndex === 6) {
                        content = new Date(
                          Number(cell) * 1000
                        ).toLocaleDateString();
                      }
                      return <td key={cellIndex}>{content}</td>;
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
