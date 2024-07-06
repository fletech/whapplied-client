import React, { useContext, useState } from "react";
import Dashboard from "../components/Dashboard";
import { SessionContext } from "../context/sessionContext";
import Heading from "../components/Heading";
import DefaultHeading from "../components/DefaultHeading";
import Modal from "../components/Modal";
// const Dashboard = React.lazy(() => import('../components/Dashboard'));

const OverviewPage = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const [triggerNewRow, setTriggerNewRow] = useState(false);

  if (!user) {
    return <DefaultHeading />;
  }
  return (
    <article className="OverviewPage">
      <section className="flex flex-col mb-8">
        <div className="mb-8">
          <button
            className="rounded-lg bg-custom-blue px-4 py-2 w-auto h-auto text-white font-semibold flex items-center"
            onClick={() => setTriggerNewRow(!triggerNewRow)}
          >
            <span className="mr-2 rounded-full bg-white-smoke text-custom-blue w-4 h-4 flex items-center justify-center pb-[1px] font-extrabold outline-2">
              +
            </span>{" "}
            Add New
          </button>
        </div>
        <Dashboard />
        <Modal trigger={triggerNewRow} onClose={() => setTriggerNewRow(false)}>
          <div className="flex flex-col">
            <p>New Record</p>
          </div>
        </Modal>
      </section>
    </article>
  );
};

export default OverviewPage;
