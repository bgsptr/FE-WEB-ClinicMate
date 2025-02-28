import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { variables } from "../constants/variable";
import axios from "axios";

interface RawatJalan {
  id_rawat_jalan: string,
  id_patient: string;
  id_doctor: string;
  visit_date: string;
  status_rawat_jalan: string;
  verifikasi_status: string;
  doctor_name: string;
  patient_name: string;
  queue_no: number;
  queue_status: string;
  id_queue: number;
}

const RawatJalanSchedule = () => {

  const [outpatients, setOutpatients] = useState<RawatJalan[]>([]);
  const [status, setStatus] = useState("pending");

  const token = localStorage.getItem("token")
  useEffect(() => {
    const fetchOutpatients = async () => {
      const url = `${variables.BASE_URL}/outpatients?status=${status}`;
      try {
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        setOutpatients(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchOutpatients();
  }, [status, token]);
  

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="bg-gray-100 w-full px-[6rem] py-[2rem] flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <h3 className="text-[#478CCF] font-bold">Rawat Jalan</h3>
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
          <h3 className="font-semibold">Registrasi</h3>
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
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[15%] px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            + Registrasi
          </button>
        </div>

        <div className="flex gap-7 w-full">
          <div className="w-1/4">
            <select
              id="jenis-kelamin"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="" disabled selected>
                Semua Hari
              </option>
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>

          <div className="w-1/4 relative">
            <input
              type="text"
              id="tempatlahir"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cari no RM atau nama pasien"
              required
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="absolute top-3 right-5 bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </div>
        </div>

        <ul className="flex gap-8 mt-8 mb-[-0.7rem] ml-5 font-semibold">
          <button
          onClick={() => setStatus("accepted")}
          >Disetujui</button>
          <button onClick={() => setStatus("pending")} className="text-[#478CCF] relative">
            Menunggu Konfirmasi
            <div className="absolute left-0 top-[2.1rem] w-full border-t-2 border-[#478CCF]"></div>
          </button>

          <button
          onClick={() => setStatus("rejected")}
          >Dibatalkan</button>
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
                WAKTU KONSUL
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                ANTRIAN (SLOT)
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                PASIEN
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                DOKTER
              </th>
              <th
                scope="col"
                className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                STATUS
              </th>
              <th
                scope="col"
                className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Action
              </th>
            </tr>
          </thead>
            

          <tbody className="divide-y divide-gray-200">
          {outpatients.map((val) => (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                <h1 className="font-semibold">30 Mei 2023</h1>
                <p className="font-normal">16:00-22:00</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {val.queue_no} (21:00)
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <h1 className="font-semibold" id={val.id_patient}>{val.patient_name}</h1>
                <p className="font-normal">NRMF002009</p>
                <p className="font-normal">Reguler</p>
              </td>
              <td className="px-6 py-4 w-5 whitespace-nowrap text-end text-sm font-medium">
                <p id={val.id_doctor}>dr. {val.doctor_name}</p>
              </td>
              <td className="px-9 py-3 w-5 whitespace-nowrap text-sm font-semibold">
                <p className="ml-7 bg-yellow-300 py-1 text-md text-center text-[#000] w-1/2">
                  {val.verifikasi_status?.toLowerCase()}
                </p>
                <p className="font-normal">30 Mei 2024, 10:32</p>
              </td>
              <td className="flex justify-center text-center gap-3 h-full py-8">
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="12" fill="#4CAF50" />
                    <path
                      d="M9 12.5L11.5 15L15.5 9"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>

                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="12" fill="#F44336" />
                    <path
                      d="M15 9L9 15"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 9L15 15"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </td>
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

export default RawatJalanSchedule;
