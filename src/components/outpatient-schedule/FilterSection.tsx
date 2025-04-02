import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../../constants/variable";
import axios from "axios";
import { DoctorDropdown } from "../../pages/RawatJalanRegister";
import { QueryOutpatientAction } from "../../pages/RawatJalanSchedule";

interface FilterSectionProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  dispatch: Dispatch<QueryOutpatientAction>;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  onSearch,
  onFilterChange,
  dispatch,
}) => {
  const [token] = useState(localStorage.getItem("token"));
  const [doctorsDropdown, setDoctorsDropdown] = useState<
    DoctorDropdown[] | null
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const url = `${variables.BASE_URL}/doctors`;
      try {
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctorsDropdown(res.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDoctors();
  }, []);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-7 w-full">
        <div className="w-[27.5%]">
          <select
            name="doctor_id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => {
              onFilterChange(e.target.value);
              dispatch({
                type: "OUTPATIENT_FILTER",
                attrName: e.target.name,
                value: e.target.value,
              });
            }}
          >
            <option value="" disabled selected>
              Cari Nama Dokter
            </option>
            {doctorsDropdown?.map((doctor) => (
              <option value={doctor.id_doctor}>{doctor.name}</option>
            ))}
          </select>
        </div>
        <div className="w-[30%]">
          <input
            name="date"
            type={isHovered ? "date" : "text"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onChange={(e) => {
              dispatch({
                type: "OUTPATIENT_FILTER",
                attrName: e.target.name,
                value: e.target.value,
              });
            }}
            className="px-4 py-2 border rounded-md w-full"
            placeholder="Filter tanggal konsultasi"
          />
        </div>
        <div className="w-[30%] relative">
          <input
            type="text"
            name="patient_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Cari Nama/No.Telp pasien"
            onChange={(e) => {
              onSearch(e.target.value);
              dispatch({
                type: "OUTPATIENT_FILTER",
                attrName: e.target.name,
                value: e.target.value,
              });
            }}
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
      <button
        type="submit"
        onClick={() => navigate("register")}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[15%] px-5 py-2.5 text-center"
      >
        + Registrasi
      </button>
    </div>
  );
};

export default FilterSection;
