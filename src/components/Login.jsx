// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   const handleGoogleLogin = () => {
//     window.location.href = "/api/v1/auth/google";
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await fetch("/api/v1/auth/logout", { method: "GET" });
//       if (response.ok) {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <div className="login flex items-center justify-start  w-full">
//       <div className="p-8 bg-white rounded-lg ">
//         <button
//           onClick={handleGoogleLogin}
//           className="w-auto px-4 py-2 font-bold   rounded "
//         >
//           Login with Google
//         </button>
//         <button
//           onClick={handleLogout}
//           className="w-auto px-4  mx-4 font-bold  rounded "
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useContext } from "react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { useAuth } from "../hooks/useAuth";
// import { SessionManager } from "../services/sessionManager";

const Login = () => {
  // const context = useContext(SessionManager);
  const { isLoggedIn } = useAuth();

  return (
    <div className="login flex items-center justify-start  w-full">
      <div className="py-8 bg-white rounded-lg ">
        {!isLoggedIn && <LoginButton />}
        {isLoggedIn && <LogoutButton />}
      </div>
    </div>
  );
};

export default Login;
