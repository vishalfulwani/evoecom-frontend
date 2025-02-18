'use client'

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";


const Page = ()=>{

     const { data: session, status } = useSession();
        console.log(session?.platform)
        useEffect(() => {
            console.log(session)
        }, [session]);

    return(
        <div className="card shadow-none mb-0">
        <div className="card-body">
            <div className="d-flex gap-2 mb-2">Hello <strong>{session?.user?.userName}</strong> (not <strong >{session?.user?.userName}?</strong>  <div  data-bs-toggle="modal" data-bs-target="#signoutModal">Logout</div>)</div>
            <p>From your account dashboard you can view your Recent Orders, manage your shipping and billing addesses and edit your password and account details</p>
        </div>

         {/* modal */}
                <div className="modal fade" id="signoutModal" tabIndex={-1} aria-labelledby="wishlistModalLabel" aria-hidden="true" style={{ borderColor: "#5180ba" }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header border-top" style={{ borderColor: "#5180ba" }}>
                        <h5 className="modal-title text-center w-100" id="wishlistModalLabel">
                          Are you sure you want to Signout?
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn text-white fw-bold"
                          style={{ backgroundColor: "#5180ba", border: "none" }}
                          data-bs-dismiss="modal"
                          onClick={() => signOut()}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#416898")}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#5180ba")}
                        >
                          Signout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
    </div>
    )
}
export default Page
