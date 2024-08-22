import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiStackFill } from "react-icons/ri";
import { BiSolidArchive } from "react-icons/bi";
import { MdPlaylistPlay } from "react-icons/md";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import AuthButton from "./AuthButton";
import { SessionContext } from "../context/sessionContext";
import { TableContext } from "../context/tableContext";
import useModal from "../hooks/useModal";
import RowForm from "./RowForm";

const Sidebar = ({ setTrigger }) => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const { pageFilter, modalState, setModalState } = useContext(TableContext);

  const UserModalContent = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <img
          src={user?.avatarUrl}
          alt="User Avatar"
          className="rounded-full w-20 h-20"
        />
        <p className="text-xl font-bold mt-4">{user?.name}</p>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>
    );
  };

  return (
    <aside className="Layout-sidebar w-[200px] h-[full] border-r border-r-dark-gray ">
      <div className="sticky pt-[14vh] mr-8  h-[100vh] left-8 top-0 pb-10 flex flex-col justify-between items-center ">
        <div className="w-full">
          <div className="  w-auto h-auto mb-4">
            <button
              className="rounded-lg bg-custom-blue px-2 py-2  text-white font-semibold flex items-center justify-center w-full"
              onClick={() =>
                setModalState({
                  type: "newRow",
                  trigger: true,
                  children: (
                    <RowForm edit={false} hideActivityContent={false} />
                  ),
                })
              }
            >
              <span className="mr-2 rounded-full bg-white-smoke text-custom-blue w-4 h-4 flex items-center justify-center pb-[1px] font-extrabold outline-2">
                +
              </span>{" "}
              Add
            </button>
          </div>
          <div className="w-full flex flex-col items-start justify-start mb-2">
            <Link
              to="/"
              className={`hover:text-custom-blue font-semibold flex items-center  w-full h-full ${
                pageFilter == "home" ? "text-custom-blue" : "text-soft-black"
              }`}
            >
              <MdPlaylistPlay />
              <p className="ml-2">Dashboard</p>
            </Link>
          </div>
          <div className="w-full flex flex-col items-start justify-start mb-2">
            <Link
              to="/active"
              className={`hover:text-custom-blue font-semibold flex items-center  w-full h-full ${
                pageFilter == "active" ? "text-custom-blue" : "text-soft-black"
              }`}
            >
              <MdPlaylistPlay />
              <p className="ml-2">Actives</p>
            </Link>
          </div>
          <div className="w-full flex flex-col items-start justify-start mb-2 ">
            <Link
              to="/overview"
              className={`hover:text-custom-blue font-semibold flex items-center  w-full h-full ${
                pageFilter == "overview"
                  ? "text-custom-blue"
                  : "text-soft-black"
              }`}
            >
              <RiStackFill />
              <p className="ml-2">Overview</p>
            </Link>
          </div>
          <div className="w-full flex flex-col items-start justify-start mb-2 border-t-[0.5px] border-soft-black pt-2">
            <Link
              to="/rejected"
              className={`hover:text-custom-blue font-regular flex items-center  w-full h-full ${
                pageFilter == "rejected"
                  ? "text-custom-blue"
                  : "text-soft-black"
              }`}
            >
              <MdOutlinePlaylistRemove />
              <p className="ml-2">Rejected</p>
            </Link>
          </div>
          <div className="w-full flex flex-col items-start justify-start mb-2">
            <Link
              to="/archived"
              className={`hover:text-custom-blue font-regular flex items-center  w-full h-full ${
                pageFilter == "archived"
                  ? "text-custom-blue"
                  : "text-soft-black"
              }`}
            >
              <BiSolidArchive />
              <p className="ml-2">Archived</p>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center  w-full cursor-pointer">
          <div className="flex items-center w-full justify-center mb-4 ">
            <img
              src={user?.avatarUrl}
              alt="User Avatar"
              className="rounded-full w-8 h-8"
            />
            <p
              className="ml-2 text-xs font-bold"
              onClick={() =>
                setModalState({
                  type: "other",
                  trigger: true,
                  children: <UserModalContent />,
                })
              }
            >
              {user?.name}
            </p>
          </div>
          <AuthButton type="small" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
