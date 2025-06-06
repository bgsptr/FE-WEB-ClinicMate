import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "./types";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { variables } from "../constants/variable";

const Sidebar = () => {
  const navigate = useNavigate();

  const currLocation = window.location.href;
  const parameterURL = currLocation.slice(22).split("/")[0];

  useEffect(() => {
    console.log(parameterURL);
  }, [parameterURL]);

  const isActive = (path: string) => parameterURL === path;

  const joinSocketAndNavigate = () => {
    // e.preventDefault();

    navigate("/chat");
  };

  const { role, setRole }: any = useAuth();

  const handleLogout = async () => {
    // await logout();
    try {
      await axios.post(
        `${variables.BASE_URL}/users/logout`,
        {}, // Empty body
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      localStorage.removeItem("role");
      setRole(null);

      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex p-6">
      <p>Klinik Ananta</p>
      <ul>
        <div
          id="hs-offcanvas-example"
          className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700"
          role="dialog"
          tabIndex={-1}
          aria-label="Sidebar"
        >
          <div className="px-6 flex items-center gap-3">
            <img
              src="https://storage.googleapis.com/clinic-mate/logo-myclinic.png"
              alt=""
              className="w-[32px] h-[32px]"
            />
            <a
              className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
              href="#"
              aria-label="Brand"
            >
              ClinicMate
            </a>
          </div>
          <nav
            className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
            data-hs-accordion-always-open
          >
            <ul className="space-y-1.5">
              {(role === Role.ADMIN ||
                role === Role.DOCTOR ||
                role === Role.PATIENT) && (
                <li>
                  <a
                    className={`cursor-pointer font-semibold flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 ${
                      isActive("dashboard")
                        ? "bg-gray-100 dark:bg-neutral-700"
                        : ""
                    }`}
                    onClick={() => navigate("../dashboard")}
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Dashboard
                  </a>
                </li>
              )}

              {(role === Role.ADMIN || role === Role.PATIENT) && (
                <li>
                  <a
                    className={`cursor-pointer font-semibold flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 ${
                      isActive("rawat_jalan")
                        ? "bg-gray-100 dark:bg-neutral-700"
                        : ""
                    }`}
                    onClick={() => {
                      if (role === Role.ADMIN) {
                        navigate("/rawat_jalan");
                      }
                      if (role === Role.PATIENT) {
                        navigate("/rawat_jalan/register");
                      }
                    }}
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Rawat Jalan
                  </a>
                </li>
              )}

              {(role === Role.ADMIN || role === Role.PATIENT) && (
                <li>
                  <a
                    className={`cursor-pointer font-semibold flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 ${
                      isActive("patient")
                        ? "bg-gray-100 dark:bg-neutral-700"
                        : ""
                    }`}
                    onClick={() => {
                      if (role === Role.PATIENT) {
                        navigate("/patient/register");
                      } else if (role === Role.ADMIN) {
                        navigate("/patient");
                      } else {
                        navigate("/forbidden");
                      }
                    }}
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="18" cy="15" r="3" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                      <path d="m21.7 16.4-.9-.3" />
                      <path d="m15.2 13.9-.9-.3" />
                      <path d="m16.6 18.7.3-.9" />
                      <path d="m19.1 12.2.3-.9" />
                      <path d="m19.6 18.7-.4-1" />
                      <path d="m16.8 12.3-.4-1" />
                      <path d="m14.3 16.6 1-.4" />
                      <path d="m20.7 13.8 1-.4" />
                    </svg>
                    Pasien
                  </a>
                </li>
              )}

              {(role === Role.ADMIN) && (
                <li>
                  <a
                    className={`cursor-pointer font-semibold flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 ${
                      isActive("doctor")
                        ? "bg-gray-100 dark:bg-neutral-700"
                        : ""
                    }`}
                    onClick={() => navigate("/doctor")}
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="18" cy="15" r="3" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                      <path d="m21.7 16.4-.9-.3" />
                      <path d="m15.2 13.9-.9-.3" />
                      <path d="m16.6 18.7.3-.9" />
                      <path d="m19.1 12.2.3-.9" />
                      <path d="m19.6 18.7-.4-1" />
                      <path d="m16.8 12.3-.4-1" />
                      <path d="m14.3 16.6 1-.4" />
                      <path d="m20.7 13.8 1-.4" />
                    </svg>
                    Doctor
                  </a>
                </li>
              )}

              {role === Role.PATIENT && (
                <li>
                  <a
                    className={`font-semibold flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 ${
                      isActive("riwayat_antrian")
                        ? "bg-gray-100 dark:bg-neutral-700"
                        : ""
                    }`}
                    href="#"
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
                      <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
                      <path d="M15 2v5h5" />
                    </svg>
                    Riwayat Antrian
                  </a>
                </li>
              )}

              <li>
                <a
                  className={`cursor-pointer font-semibold flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 ${
                    isActive("jadwal_praktik")
                      ? "bg-gray-100 dark:bg-neutral-700"
                      : ""
                  }`}
                  onClick={() => navigate("/jadwal_praktik/list")}
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                    <path d="M16 18h.01" />
                  </svg>
                  Jadwal Praktik
                </a>
              </li>

              <li>
                <a
                  className={`font-semibold flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 ${
                    isActive("rekam_medis")
                      ? "bg-gray-100 dark:bg-neutral-700"
                      : ""
                  }`}
                  href="#"
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  Rekam Medis
                </a>
              </li>

              <li>
                <a
                  className={`cursor-pointer font-semibold flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 ${
                    isActive("chat") ? "bg-gray-100 dark:bg-neutral-700" : ""
                  }`}
                  onClick={joinSocketAndNavigate}
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-9 8.4 8.5 8.5 0 0 1-3.88-.94L3 21l1.12-4.12A8.38 8.38 0 0 1 3 11.5a8.5 8.5 0 0 1 17 0Z" />
                  </svg>
                  Chat
                </a>
              </li>

              <li>
                <a
                  className={`cursor-pointer font-semibold flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 ${
                    isActive("logout") ? "bg-gray-100 dark:bg-neutral-700" : ""
                  }`}
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <li>Dashboard</li>
      </ul>
    </div>
  );
};

export default Sidebar;
