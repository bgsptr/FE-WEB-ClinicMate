import { ChangeEvent, useEffect, useReducer, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { variables } from "../constants/variable";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";
import { PaginationColor } from "../components/types";

export interface Patient {
  id_patient: string;
  name: string;
  birth_date: string;
  gender: string;
  address: string;
  phone_number: string;
}

export interface QueryPatientDto {
  date: string;
  patient_name: string;
}

export interface PatientPageState {
  firstLoad: boolean;
  queryPatient: QueryPatientDto;
}

export interface QueryPatientAction {
  type: string;
  // attrName: keyof QueryOutpatientDto,
  attrName?: string;
  value: string | boolean;
}

const PatientList = () => {
  // const token = localStorage.getItem("token");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  // useEffect(() => {
  //   console.log("token", token);
  // }, [token]);

  const navigate = useNavigate();

  const reducer = (
    state: PatientPageState,
    action: QueryPatientAction
  ): PatientPageState => {
    switch (action.type) {
      case "FILTER_PATIENT":
        if (!action.attrName) return state;

        return {
          ...state,
          queryPatient: {
            ...state.queryPatient,
            [action.attrName]: action.value,
          },
        };

      case "FIRST_LOAD":
        if (typeof action.value !== "boolean") return state;
        return {
          ...state,
          firstLoad: action.value,
        };

      default:
        return state;
    }
  };

  const queryPatient: QueryPatientDto = {
    date: "",
    patient_name: "",
  };

  const patientPageStateInit: PatientPageState = {
    firstLoad: true,
    queryPatient: queryPatient,
  };

  const [state, dispatch] = useReducer(reducer, patientPageStateInit);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const [page, setPage] = useState(1);

  const handlePageChange = (
    e: ChangeEvent<HTMLSelectElement>,
    value: number
  ) => {
    setPage(value);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      const url = `${variables.BASE_URL}/patients?keyword=${
        state.queryPatient.patient_name
      }&date=${state.queryPatient.date}&index=${page - 1}`;
      try {
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const patientsData = res.data;
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    if (state.firstLoad) {
      fetchPatients();
      dispatch({ type: "FIRST_LOAD", value: false });
    } else {
      // debounce
      const filterTimeout = setTimeout(fetchPatients, 500);

      return () => {
        clearTimeout(filterTimeout);
      };
    }
  }, [state, page]);

  return (
    <div className="flex min-h-screen w-full font-poppins">
      <div className="w-[16%]">
        <Sidebar />
      </div>
      <div className="px-[4.5rem] py-[2.4rem] ml-[3rem] bg-gray-100 w-full">
        <h1 className="text-md font-bold text-gray-500 mb-9">Pasien</h1>
        <div className="flex flex-between w-full">
          <div className="flex gap-4 mb-4 w-full">
            <div className="flex justify-between items-center mb-4 w-full">
              <div className="relative flex w-2/3 gap-6">
                <input
                  type="text"
                  name="patient_name"
                  onChange={(e) => {
                    dispatch({
                      type: "FILTER_PATIENT",
                      attrName: e.target.name,
                      value: e.target.value,
                    });
                  }}
                  placeholder="Cari nama, No.Telp, no. MRN..."
                  className="relative flex-1 px-4 py-2 border rounded-md"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="absolute bi bi-search top-4 right-[55%]"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
                <input
                  onChange={(e) => {
                    dispatch({
                      type: "FILTER_PATIENT",
                      attrName: e.target.name,
                      value: e.target.value,
                    });
                  }}
                  name="date"
                  type={isHovered ? "date" : "text"}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="px-4 py-2 border rounded-md w-1/2"
                  placeholder="Pilih tanggal lahir pasien"
                />
              </div>

              <button
                onClick={() => navigate("register")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-semibold"
              >
                + Pasien
              </button>
            </div>
          </div>
        </div>

        <div>
          <ul className="flex gap-8 mt-8 ml-5 mb-8 font-semibold">
            <li className="text-[#478CCF] relative">
              Semua
              <div className="absolute left-0 top-[2.5rem] w-full border-t-2 border-[#478CCF]"></div>
            </li>
            <li className="">Aktif</li>
            <li>Tidak Aktif</li>
            <li></li>
          </ul>

          <div className="border-1 mt-[-1rem] mb-8"></div>

          <div className="border-2"></div>

          {/* tabel pasien */}
          <div className="flex flex-col bg-white">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-bold uppercase"
                        >
                          NAMA PASIEN
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-bold uppercase"
                        >
                          NO TELEPON
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-bold uppercase"
                        >
                          TGL LAHIR
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-bold uppercase"
                        >
                          JENIS KELAMIN
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-bold uppercase"
                        >
                          STATUS
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-bold uppercase"
                        >
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {patients?.map((patient) => (
                        <tr key={patient.id_patient}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-800">
                            {patient.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {patient.phone_number}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {new Date(patient.birth_date).toLocaleDateString(
                              "id-ID"
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-normal">
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm rounded-lg border border-transparent hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              {patient.gender}
                            </button>
                          </td>
                          <td className="px-6 py-3 w-5 whitespace-nowrap text-sm font-semibold">
                            <p
                              className={`px-2 py-1 text-md text-center ${
                                patient
                                  ? "bg-blue-100 text-[#478CCF]"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {"Active"}
                            </p>
                          </td>
                          <td className="px-6 py-3 w-5 whitespace-nowrap text-sm font-semibold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                            </svg>
                          </td>
                        </tr>
                      ))}

                      <tr className="w-full">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td colSpan={2} className="py-3 px-2">
                          <PaginationComponent
                            color={PaginationColor.PRIMARY}
                            countTotalPage={patients.length / 10 + 1}
                            page={page}
                            handlePageChange={handlePageChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* tabel pasien */}
        </div>
      </div>
    </div>
  );
};

export default PatientList;
