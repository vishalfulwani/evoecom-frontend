// 'use client'

// import { useSession } from "next-auth/react";
// import { useEffect } from "react";


// const Page = ()=>{

//       const { data: session, status } = useSession();
//             console.log(session?.platform)
//             useEffect(() => {
//                 console.log(session)
//             }, [session]);
    

//     return(
//         <div className="card shadow-none mb-0">
//         <div className="card-body">
//             <form className="row g-3">
//                 <div className="col-md-6">
//                     <label className="form-label">First Name</label>
//                     <input type="text" className="form-control" value={session?.user?.firstName}/>
//                 </div>
//                 <div className="col-md-6">
//                     <label className="form-label">Last Name</label>
//                     <input type="text" className="form-control" value={session?.user?.lastName}/>
//                 </div>
//                 <div className="col-12">
//                     <label className="form-label">Display Name</label>
//                     <input type="text" className="form-control" value={session?.user?.userName}/>
//                 </div>
//                 <div className="col-12">
//                     <label className="form-label">Email address</label>
//                     <input type="text" className="form-control" value={session?.user?.email || ""}/>
//                 </div>
//                 <div className="col-12">
//                     <label className="form-label">Current Password</label>
//                     <input type="text" className="form-control" value="................."/>
//                 </div>
//                 <div className="col-12">
//                     <label className="form-label">New Password</label>
//                     <input type="text" className="form-control" value="................."/>
//                 </div>
//                 <div className="col-12">
//                     <label className="form-label">Confirm New Password</label>
//                     <input type="text" className="form-control" value="................."/>
//                 </div>
//                 <div className="col-12">
//                     <button type="button" className="btn btn-light btn-ecomm">Save Changes</button>
//                 </div>
//             </form>
//         </div>
//     </div>
//     )
// }
// export default Page







'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_BASE_URL } from "../../../../../constants";

const Page = () => {
  const { data: session, status } = useSession();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation to check if new passwords match
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      // const response = await axios.post("/api/change-password", {
      const response = await axios.post(`${APP_BASE_URL}/change-password`, {
          oldPassword,
          newPassword,
      });
        toast.success("Password changed successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while changing the password");
    }
  };

  return (
    <div className="card shadow-none mb-0">
      <div className="card-body">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" value={session?.user?.firstName} readOnly />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" value={session?.user?.lastName} readOnly />
          </div>
          <div className="col-12">
            <label className="form-label">Display Name</label>
            <input type="text" className="form-control" value={session?.user?.userName} readOnly />
          </div>
          <div className="col-12">
            <label className="form-label">Email address</label>
            <input type="text" className="form-control" value={session?.user?.email || ""} readOnly />
          </div>
          <div className="col-12">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-light btn-ecomm">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
