import React, { useContext, useEffect, useState, useRef } from "react";
import { SessionContext } from "../context/sessionContext";
import Home from "../components/Home";
import Heading from "../components/Heading";
import useData from "../hooks/useData";
import { TableContext } from "../context/tableContext";
import { RiExpandDiagonalLine } from "react-icons/ri";

import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const procesarDatos = (datos, type) => {
  const fechas = {};
  const applied = {};
  const actives = {};
  const archived = {};

  datos.forEach((item) => {
    const fecha = new Date(parseInt(item.date_applied)).toLocaleDateString();
    const timestamp = parseInt(item.date_applied);

    if (item.status === "applied") {
      applied[fecha] = (applied[fecha] || 0) + 1;
    }

    switch (item.stage) {
      case "2":
        actives[fecha] = (actives[fecha] || 0) + 1;
        break;
      default:
        archived[fecha] = (archived[fecha] || 0) + 1;
    }

    fechas[timestamp] = fecha;
  });

  const labels = Object.keys(fechas)
    .map(Number)
    .sort((a, b) => a - b)
    .map((timestamp) => fechas[timestamp]);
  let datasets = [];
  type == "bar"
    ? (datasets = [
        {
          label: "Actives",
          data: labels.map((fecha) => archived[fecha] || 0),
          backgroundColor: "#4169E1",
          borderColor: "#4169E1",
          borderWidth: 1,
        },
        {
          label: "Archived",
          data: labels.map((fecha) => actives[fecha] || 0),
          backgroundColor: "gray",
          borderColor: "gray",
          borderWidth: 1,
        },
      ])
    : type == "line"
    ? (datasets = [
        {
          label: "Applied",
          data: labels.map((fecha) => applied[fecha] || 0),
          backgroundColor: "#4169E1",
          borderColor: "#4169E1",
          borderWidth: 1,
        },
      ])
    : null;

  return {
    labels,
    datasets,
  };
};

const opciones = (isModalOpen) => {
  console.log(isModalOpen);
  return {
    bar: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: isModalOpen,
          text: "Candidatures by status",
        },
      },
    },
    line: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: isModalOpen,
          text: "Candidatures by date",
        },
      },
    },
  };
};

const Grafico = ({ children }) => {
  // Procesar los datos para el gráfico
  const [filtroMes, setFiltroMes] = useState("todos");

  const meses = [
    { value: "todos", label: "Todos los meses" },
    { value: "0", label: "Enero" },
    { value: "1", label: "Febrero" },
    { value: "2", label: "Marzo" },
    { value: "3", label: "Abril" },
    { value: "4", label: "Mayo" },
    { value: "5", label: "Junio" },
    { value: "6", label: "Julio" },
    { value: "7", label: "Agosto" },
    { value: "8", label: "Septiembre" },
    { value: "9", label: "Octubre" },
    { value: "10", label: "Noviembre" },
    { value: "11", label: "Diciembre" },
  ];

  const handleFiltroMes = (e) => {
    setFiltroMes(e.target.value);
  };

  return <div className="w-full h-max">{children}</div>;
};

const ChartCard = ({ title, chartType, data, options, openRef }) => {
  const { setModalState, modalState } = useContext(TableContext);
  return (
    <div className="card w-full min-h-40 relative shadow-lg rounded-lg border border-gray h-[300px]">
      <div className="card-body p-8 h-full">
        <div className="mb-4 group flex justify-start items-center">
          <h2
            onClick={() => openRef.current.click()}
            className="hover:text-custom-blue card-title text-xl mr-2 cursor-pointer"
          >
            {title}
          </h2>
          <button
            ref={openRef}
            className="mt-1"
            onClick={() =>
              setModalState({
                type: "other",
                trigger: true,
                children: (
                  <Grafico>
                    {chartType === "bar" ? (
                      <Bar data={data} options={options(true)} />
                    ) : (
                      <Line data={data} options={options(true)} />
                    )}
                  </Grafico>
                ),
              })
            }
          >
            <RiExpandDiagonalLine className="size-5 group-hover:opacity-100 group-hover:text-custom-blue opacity-50" />
          </button>
        </div>
        <Grafico>
          {chartType === "bar" ? (
            <Bar
              data={data}
              options={options(modalState.trigger)}
              onClick={() => console.log(data)}
            />
          ) : (
            <Line data={data} options={options(modalState.trigger)} />
          )}
        </Grafico>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;

  const { tableData, loading, setModalState, modalState, setPageFilter } =
    useContext(TableContext);
  const { closeModal } = useModal();
  const open1Ref = useRef(null);
  const open2Ref = useRef(null);

  useEffect(() => {
    setPageFilter("home");
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full gap-4">
        <span className=" animate-ping size-2 rounded-full bg-custom-blue"></span>
        Loading
      </div>
    );
  }
  return (
    <section className="HomePage flex flex-col items-center justify-start h-full ">
      {!user && <Home />}
      <div className="flex flex-col items-center justify-center h-auto">
        <Heading user={user} />
      </div>
      {user && tableData.response && (
        <>
          <h2 className="text-sm self-start text-custom-blue text-left w-auto mx-8  mt-8 rounded-full bg-custom-blue/10 px-4 py-2">
            Summary
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-8 text-soft-black ">
            <ChartCard
              title="Candidatures by status"
              chartType="bar"
              data={procesarDatos(tableData.response.data, "bar")}
              options={opciones}
              openRef={open1Ref}
              setModalState={setModalState}
            />
            <ChartCard
              title="Candidatures by date"
              chartType="line"
              data={procesarDatos(tableData.response.data, "line")}
              options={opciones}
              openRef={open2Ref}
              setModalState={setModalState}
            />
            <div className="card w-full bg-base-100 shadow-lg  rounded-lg border border-gray flex flex-col items-start justify-start">
              <div className="card-body p-8 ">
                <h2 className="card-title text-xl">Summary of applications</h2>
                <p className="text-md font-light mt-4">
                  Total applications made:
                  <span className="font-bold text-custom-blue">
                    {tableData.response.data.length}
                  </span>
                </p>
                <p className="text-md font-light">
                  Positions applied:{" "}
                  <span className="font-bold text-custom-blue">
                    {
                      tableData.response.data.filter(
                        (item) => item.status === "applied"
                      ).length
                    }
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default HomePage;
