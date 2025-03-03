import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { variables } from "../constants/variable";
import axios from "axios";
import FilterSection from "../components/outpatient-schedule/FilterSection";
import StatusTabs from "../components/outpatient-schedule/StatusTabs";
import OutpatientTableRow from "../components/outpatient-schedule/OutpatientTableRow";
import { RawatJalan } from "../components/types";

const   RawatJalanSchedule = () => {
  const [outpatients, setOutpatients] = useState<RawatJalan[]>([]);
  const [status, setStatus] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOutpatients = async () => {
      const url = `${variables.BASE_URL}/outpatients?status=${status}`;
      try {
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setOutpatients(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchOutpatients();
  }, [status, token]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Add search logic here
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    // Add filter logic here
  };

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
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
          <h3 className="font-semibold">Registrasi</h3>
        </div>

        <FilterSection onSearch={handleSearch} onFilterChange={handleFilterChange} />
        <StatusTabs status={status} setStatus={setStatus} />

        <div className="border-2"></div>

        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                WAKTU KONSUL
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                ANTRIAN (SLOT)
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                PASIEN
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                DOKTER
              </th>
              <th className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                STATUS
              </th>
              <th className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {outpatients.map((val) => (
              <OutpatientTableRow key={val.id_rawat_jalan} data={val} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RawatJalanSchedule;