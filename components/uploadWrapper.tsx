"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import ProfilePage from "@/app/home/sections/ProfilePage";


export default function UploadAvatars() {
  const [open, setOpen] = React.useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  // ✅ FIXED LOGOUT FUNCTION
  const logout = async () => {
    setOpen(false);

  };

  return (
    <>
      {/* OPEN MENU BUTTON */}
      <div
        onClick={() => setOpen(true)}
        className="text-white cursor-pointer"
      >
        Open Menu
      </div>

      {/* MENU MODAL */}
      {open &&
        createPortal(
          <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center gap-4">
            <button onClick={handleClose}>Close</button>

            <button onClick={() => {
              setIsProfileModalOpen(true);
              setOpen(false);
            }}>
              Profile
            </button>

            <button onClick={logout}>Logout</button>
          </div>,
          document.body
        )}

      {/* PROFILE MODAL */}
      {isProfileModalOpen &&
        createPortal(
          <ProfilePage onClose={() => setIsProfileModalOpen(false)} />,
          document.body
        )}
    </>
  );
}