import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { variables } from "../constants/variable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Role } from "../components/types";

export interface Schedule {
  id_schedule: string;
  day: string;
  start_time: string;
  end_time: string;
  slot: number;
}

export interface DoctorSchedule {
  doctor_id: string;
  doctor_name: string;
  schedules: Schedule[];
}

const ScheduleList = () => {
  const navigate = useNavigate();

  const auth = useAuth();

  // const [token, setToken] = useState(localStorage.getItem("token"));
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([]);

  const role = auth?.role;

  useEffect(() => {
    const fetchOutpatients = async () => {
      const url = `${variables.BASE_URL}/schedule`;
      try {
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        });
        setSchedules(res.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchOutpatients();
  }, []);

  return (
    <div className="flex min-h-screen w-full font-poppins">
      <Sidebar />
      <div className="bg-gray-100 w-full px-[6rem] py-[2rem] flex flex-col gap-7">
        <div className="flex items-center gap-4">
          <h3 className="text-[#478CCF] font-bold">Jadwal Nakes</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
          <h3 className="font-semibold">Kelola Jadwal</h3>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex gap-7 w-full">
            <div className="w-[27.5%]">
              <select
                id="jenis-kelamin"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="" disabled selected>
                  Cari Nama Dokter
                </option>
                {/* <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option> */}
              </select>
            </div>
          </div>

          {role === Role.ADMIN ? (
            <button
              onClick={() => navigate("../jadwal_praktik")}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              + Tambah Jadwal
            </button>
          ) : null}
        </div>

        <ul className="flex gap-8 mt-8 mb-[-0.7rem] ml-5 font-semibold">
          <li>Semua</li>
          <li className="text-[#478CCF] relative">
            Aktif
            <div className="absolute left-0 top-[2.5rem] w-full border-t-2 border-[#478CCF]"></div>
          </li>

          <li>Tidak Aktif</li>
          <li></li>
          <li></li>
        </ul>
        <div className="border-2"></div>

        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                NAKES
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                HARI PRAKTIK
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                STATUS
              </th>
              {role === Role.ADMIN && (
                <th
                  scope="col"
                  className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                >
                  ACTION
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schedules.map((schedule) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  dr. {schedule.doctor_name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {schedule.schedules.map((value, index) => (
                    <span key={index}>
                      {value.day}
                      {index !== schedule.schedules.length - 1 && ", "}
                    </span>
                  ))}
                </td>

                <td className="px-3 py-3 w-5 whitespace-nowrap text-sm text-[#478CCF] font-semibold">
                  <p className="bg-blue-100 px-2 py-1 text-md text-center">
                    Active
                  </p>
                </td>
                {role === Role.ADMIN && (
                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button
                      onClick={() =>
                        navigate(`/jadwal_praktik/${schedule.doctor_id}`)
                      }
                      type="button"
                      className="border-2 w-9 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <svg
                        fill="#000000"
                        height="16"
                        width="16"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 282.837 282.837"
                      >
                        <g>
                          <path
                            d="M19.539,246.006c-1.412-1.413-2.995-2.159-4.576-2.159c-2.361,0-4.33,1.676-5.266,4.482l-9.24,27.723
c-0.701,2.103-0.591,3.95,0.309,5.201c0.736,1.021,1.959,1.584,3.443,1.584c0.79,0,1.655-0.155,2.571-0.461l27.722-9.241
c2.36-0.786,3.907-2.267,4.355-4.167c0.448-1.9-0.273-3.916-2.032-5.675L19.539,246.006z"
                          />
                          <path
                            d="M280.205,48.279L234.553,2.627C232.86,0.934,230.599,0,228.189,0c-2.41,0-4.67,0.934-6.363,2.627L51.892,172.561
c-3.212,3.212-6.993,9.33-8.429,13.638l-7.417,22.252c-1.503,4.508,0.008,10.909,3.368,14.27l20.697,20.697
c2.403,2.403,6.48,3.957,10.388,3.957c0,0,0,0,0.001,0c1.404,0,2.71-0.198,3.881-0.589l22.253-7.417
c4.309-1.436,10.426-5.217,13.637-8.428L280.205,61.007C283.714,57.498,283.714,51.788,280.205,48.279z M252.535,70.896
L166.8,156.631c-2.929,2.929-6.768,4.393-10.607,4.393s-7.678-1.465-10.606-4.393c-5.858-5.857-5.858-15.355,0-21.213
l85.735-85.735c5.857-5.857,15.355-5.857,21.213,0C258.393,55.54,258.393,65.038,252.535,70.896z"
                          />
                        </g>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </button>
                  </td>
                )}
              </tr>
            ))}

            <tr className="">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center gap-2">
                <p>0-0 dari 0</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleList;
