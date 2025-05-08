import axios from "axios";
import Sidebar from "../components/Sidebar";
import { variables } from "../constants/variable";
import {
  FormEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { OutpatientSecondePage } from "../components/OutpatientSecondPage";
import {
  getEcryptedLocalStorage,
  setEcryptedLocalStorage,
} from "../utils/local-storage-crypto";
import { useNavigate } from "react-router-dom";
import ErrorInputMessage from "../components/ErrorInputMessage";
import outpatientRegisterSchema from "../utils/validations/outpatientRegisterSchema";
import { ZodError } from "zod";
import { Gender, Role } from "../components/types";
import { useAuth } from "../context/AuthContext";
import fetchData from "../utils/axios/fetchData";
import { SearchWithAutocomplete } from "../components/SearchWithAutocomplete";
import { OptionType } from "../components/outpatient-schedule/FilterSection";

export interface PatientRegisterToOutpatient {
  id_patient: string;
  name: string;
  birth_date: string;
  gender: string;
  address: string;
  phone_number: string;
  email: string;
  url_profile: string;
}

export interface DoctorDropdown {
  id_doctor: string;
  name: string;
}

export interface DoctorMenuRegister {
  patientId: string | null;
  doctorId: string | null;
  outpatientQueueDate: string | null;
  hourStartTime: string | null;
  visitDate: Date | string | null;
  queueNo: number | null;
}

export interface AvailableQueueSchedule {
  queueNo: number;
  startTime: string;
  endTime: string;
  availableStatus: boolean;
}

export interface SelfPatientInformation {
  id_patient: string;
  name: string;
  birth_date: string;
  gender: Gender;
  address: string;
  phone_number: string;
  email: string;
}

const RawatJalanRegister = () => {
  const auth = useAuth();
  const role = auth?.role;
  const [token] = useState(localStorage.getItem("token"));
  const [patients, setPatients] = useState<PatientRegisterToOutpatient[]>([]);
  const [doctors, setDoctors] = useState<DoctorDropdown[]>([]);
  const [selectedPatient, setSelectedPatient] =
    useState<PatientRegisterToOutpatient | null>(null);

  const [selfPatient, setSelfPatient] = useState<SelfPatientInformation | null>(
    null
  );
  const [queues, setQueues] = useState<AvailableQueueSchedule[]>([]);

  const [doctorMenu, setDoctorMenu] = useState<DoctorMenuRegister>({
    patientId: null,
    doctorId: null,
    outpatientQueueDate: null,
    hourStartTime: null,
    visitDate: null,
    queueNo: null,
  });

  // const [menuLocalStorage, setMenuLocalStorage] = useState(localStorage.getItem("doctorMenu"));
  const getLocal = getEcryptedLocalStorage("doctorMenu");
  const [storedValue] = useState<{
    doctorId: string;
    outpatientQueueDate: string;
  } | null>((getLocal && JSON.parse(getLocal)) || null);

  useEffect(() => {
    console.log(doctorMenu);
  }, [doctorMenu]);

  const [page] = useState(0);
  // const [loading, setLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(true);

  const fetchDoctors = async () => {
    // if (loading || !hasMore) return;

    // setLoading(true);

    const url = `${variables.BASE_URL}/doctors?index=${page}`;
    try {
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const doctorsData = res.data.result;
      // setDoctors((prev) => [...prev, ...doctorsData]);
      setDoctors(doctorsData);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const getMyPatientProfile = async (url: string) => {
    const data: SelfPatientInformation = await fetchData(url);
    setSelfPatient(data);
    setDoctorMenu((prevData) => ({
      ...prevData,
      patientId: data.id_patient,
    }));
  };

  const fetchPatients = async () => {
    const url = `${variables.BASE_URL}/patients`;
    try {
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const patientsData = res.data;
      setPatients(patientsData);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
    if (role === Role.PATIENT) {
      getMyPatientProfile(`${variables.BASE_URL}/patients/me`);
    }
  }, []);

  //doctor
  useEffect(() => {
    fetchDoctors();
  }, []);

  // useEffect(() => {

  //   fetchSelectedSchedule();

  // }, [doctorMenu])

  // const fetchSelectedScheduleFromAPI = async (e: any) => {
  //   e.preventDefault();

  //   const url = `${variables.BASE_URL}/doctors/${doctorMenu.doctorId}/schedules?consult_date=${doctorMenu.outpatientQueueDate}`
  //   try {
  //     const res = await axios.get(url, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         'Authorization': `Bearer ${token}`
  //       },
  //       withCredentials: true
  //     });

  //     const queueDatas = res.data;
  //     setQueues(queueDatas);
  //   } catch (error) {
  //     console.error("Error fetching patients:", error);
  //   }
  // }

  // const handlePatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedId = event.target.value;
  //   const patient = patients.find((p) => p.id_patient === selectedId) || null;
  //   setSelectedPatient(patient);

  //   // handleConsultDate(event);
  // };

  const handleKeywordChange = (
    event: SyntheticEvent,
    selected: OptionType | null,
    name: string
  ) => {
    const patient = patients.find((p) => p.id_patient === selected?.id) || null;
    setSelectedPatient(patient);
    if (selected && patient) {
      const target = event.target as HTMLInputElement | HTMLSelectElement;
      console.log(target);
      handleConsultDateAutoComplete(name, patient?.id_patient);
    }
  };

  const handleConsultDateAutoComplete = (
    // event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    name: string,
    patientId: string
  ) => {
    setDoctorMenu({
      ...doctorMenu,
      [name]: patientId,
    });
  };

  const handleConsultDate = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    // target: HTMLInputElement | HTMLSelectElement
  ) => {
    setDoctorMenu({
      ...doctorMenu,
      [event.target.id]: event.target.value,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log(doctorMenu);
  }, [doctorMenu]);

  useEffect(() => {
    console.log("patient data: ", selfPatient);
  }, [selfPatient]);

  const [errorValidate, setErrorValidate] = useState<Map<string, string>>();

  const saveLocalAndRedirect = async (e: FormEvent) => {
    e.preventDefault();
    const { patientId, doctorId, outpatientQueueDate } = doctorMenu;

    // localStorage.setItem('doctorMenu', JSON.stringify({ doctorId, outpatientQueueDate }));

    const url = `${variables.BASE_URL}/doctors/${doctorId}/schedules?consult_date=${outpatientQueueDate}`;
    try {
      outpatientRegisterSchema.parse({
        patientId,
        doctorId,
        outpatientQueueDate,
      });

      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const queueDatas = res.data;
      setQueues(queueDatas);

      setEcryptedLocalStorage(
        "doctorMenu",
        JSON.stringify({ patientId, doctorId, outpatientQueueDate })
      );

      navigate(0);
    } catch (error) {
      console.error("Error fetching patients:", error);

      if (error instanceof ZodError) {
        const errorMsg = new Map();
        error.errors.map((err) => {
          errorMsg.set(err.path.join(), err.message);
        });

        setErrorValidate(errorMsg);
      }
    }
  };

  return storedValue?.doctorId && storedValue?.outpatientQueueDate ? (
    <OutpatientSecondePage
      queues={queues}
      outpatientData={doctorMenu}
      setOutpatientData={setDoctorMenu}
    />
  ) : (
    <div className="flex min-h-screen w-full font-poppins">
      <Sidebar />
      <div className="bg-gray-100 w-full px-[6rem] py-[2rem] flex flex-col gap-7">
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
          <h3 className="text-[#478CCF] font-bold">Registrasi</h3>
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
          <h3 className="font-semibold">Buat Registrasi</h3>
        </div>

        <table className="min-w-full divide-y divide-gray-200 bg-white min-h-screen">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 pt-5 pb-3 text-start text-xs text-gray-500 uppercase font-bold"
              >
                DATA PASIEN
              </th>
            </tr>
            <div className="border-2 mt-2"></div>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <div className="px-6 pt-5 pb-3">
              <h1 className="font-bold">Nama Pasien</h1>
              {/* form pasien */}
              <form className="mt-9 w-full min-h-screen">
                <div className="mb-5 flex gap-7 w-full">
                  {/* Email field */}
                  <div className="w-1/2">
                    <label
                      htmlFor="patientId"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nama Lengkap
                    </label>

                    {role === Role.PATIENT ? (
                      // Jika role-nya adalah pasien, tampilkan satu pilihan saja (readonly select atau text)
                      <select
                        id="patientId"
                        value={selfPatient?.id_patient || ""}
                        disabled
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
      dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value={selfPatient?.id_patient}>
                          {selfPatient?.name}
                        </option>
                      </select>
                    ) : (
                      // Jika role-nya bukan pasien, maka bisa pilih dari list autocomplete
                      <SearchWithAutocomplete
                        labelName="Pilih Pasien"
                        name="patientId"
                        data={patients.map((patient) => ({
                          id: patient.id_patient,
                          name: patient.name,
                        }))}
                        value={{
                          id: selectedPatient?.id_patient || "",
                          name: selectedPatient?.name || "",
                        }}
                        keywordChange={handleKeywordChange}
                      />
                    )}

                    <ErrorInputMessage
                      name="patientId"
                      errors={errorValidate!}
                    />
                  </div>

                  {/* Jenis Kelamin field */}
                  <div className="w-1/2">
                    <label
                      htmlFor="jenis-kelamin"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      className="px-4 py-2 border rounded-md w-full"
                      value={
                        role === Role.PATIENT
                          ? selfPatient?.birth_date.split("T")[0]
                          : selectedPatient?.birth_date.split("T")[0] || ""
                      }
                      readOnly
                    />
                  </div>
                </div>

                {/* tempat tgl lahir */}
                <div className="mb-5 flex gap-7 w-full">
                  {/* Email field */}
                  <div className="w-1/2">
                    <label
                      htmlFor="tempatlahir"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tempat Lahir
                    </label>
                    <input
                      type="text"
                      id="tempatlahir"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      // placeholder="Tempat Lahir"
                      value={selectedPatient?.address || ""}
                      required
                      readOnly
                    />
                  </div>

                  {/* Jenis Kelamin field */}
                  <div className="w-1/2">
                    <label
                      htmlFor="jenis-kelamin"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Jenis Kelamin
                    </label>
                    <input
                      type="text"
                      id="jenis-kelamin"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={
                        role === Role.PATIENT
                          ? selfPatient?.gender
                          : selectedPatient?.gender || ""
                      }
                      readOnly
                    />
                  </div>
                </div>
                {/* tempat tgl lahir */}
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Alamat Domisili
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="resize-none mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // placeholder="Masukkan Alamat Tempat Tinggal"
                    value={
                      role === Role.PATIENT
                        ? selfPatient?.address
                        : selectedPatient?.address || ""
                    }
                    readOnly
                  ></textarea>
                </div>

                {/* <div className="w-full mb-8">
                  <label
                    htmlFor="tempatlahir"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nomor Rekam Medis
                  </label>
                  <input
                    type="text"
                    id="tempatlahir"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Masukkan Nomor Rekam Medis Pasien"
                    required
                  />
                </div> */}

                <div className="border-1 mt-9"></div>
                <div className="mt-7 font-bold text-sm">DATA KONTAK</div>

                <div className="w-1/2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-9"
                  >
                    No Telepon
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // placeholder="Isi Nomor Telepon Pasien"
                    value={
                      role === Role.PATIENT
                        ? selfPatient?.phone_number
                        : selectedPatient?.phone_number || ""
                    }
                    readOnly
                  />
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={
                      role === Role.PATIENT
                        ? selfPatient?.email
                        : selectedPatient?.email || ""
                    }
                    readOnly
                  />
                </div>
              </form>
              {/* form pasien */}

              <div className="border-1 mt-9"></div>

              <div className="mt-7 font-bold text-sm">DOKTER & JADWAL</div>

              <div className="w-full mt-5">
                <label
                  htmlFor="jenis-kelamin"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama Nakes
                </label>
                <select
                  id="doctorId"
                  onChange={handleConsultDate}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="" disabled selected>
                    Pilih Dokter yang Tersedia
                  </option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id_doctor} value={doctor.id_doctor}>
                      dr. {doctor.name}
                    </option>
                  ))}
                </select>
                <ErrorInputMessage name="doctorId" errors={errorValidate!} />
              </div>

              <div className="mb-5 flex gap-7 w-full mt-5">
                <div className="w-1/2">
                  <label
                    htmlFor="jenis-kelamin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tanggal Konsultasi
                  </label>
                  <input
                    type="date"
                    id="outpatientQueueDate"
                    onChange={handleConsultDate}
                    className="px-4 py-2 border rounded-md w-full"
                  />
                  <ErrorInputMessage
                    name="outpatientQueueDate"
                    errors={errorValidate!}
                  />
                </div>

                {/* <div className="w-1/2">
                  <label
                    htmlFor="jenis-kelamin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Jam Konsultasi
                  </label>
                  <input
                    type="input"
                    className="px-4 py-2 border rounded-md w-full"
                  />
                </div> */}
              </div>
            </div>
          </tbody>
        </table>

        <button
          type="submit"
          onClick={saveLocalAndRedirect}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RawatJalanRegister;
