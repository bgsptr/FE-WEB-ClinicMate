import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios, { AxiosError } from "axios";
import { variables } from "../constants/variable";
import { useAuth } from "../context/AuthContext";
import { Role } from "../components/types";
import { useNavigate } from "react-router-dom";
import patientFormSchema from "../utils/validations/patientFormSchema";
import { ZodError } from "zod";
import ErrorInputMessage from "../components/ErrorInputMessage";
import ModalComponent from "../components/ModalComponent";

interface PatientRegister {
  full_name: string;
  birth_place: string;
  birth_date: string;
  gender: string;
  domicile: string;
  phone_number: string;
  email: string;
}

const PatientRegister = () => {
  const token = localStorage.getItem("token");

  const auth = useAuth();
  const role = auth?.role;

  // const [, setIsSidebarOpen] = useState(false);
  // const [, setOpenAccordion] = useState<number | null>(null);
  const [patientData, setPatientData] = useState<PatientRegister>({
    full_name: "",
    birth_place: "",
    birth_date: "",
    gender: "",
    domicile: "",
    phone_number: "",
    email: "",
  });

  // const [email, setEmail] = useState("");

  // Toggle the sidebar open/close
  // const handleSidebarToggle = () => {
  //   setIsSidebarOpen((prev) => !prev);
  // };

  // Toggle accordion items
  // const handleAccordionToggle = (index: number) => {
  //   setOpenAccordion((prevIndex) => (prevIndex === index ? null : index));
  // };

  const [readOnlyInput, setReadOnlyInput] = useState(
    role === Role.PATIENT ? true : false
  );

  const handleReadOnlyInput = () => {
    setReadOnlyInput(false);
  };

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  const [errorValidaton, setErrorValidation] = useState<any>();
  const [errorBackend, setErrorBackend] = useState<string>("");

  const submitUpdateData = async (e: FormEvent) => {
    e.preventDefault();

    if (role === Role.PATIENT) {
      // fetch update data

      setReadOnlyInput(true);
    }

    const url = `${variables.BASE_URL}/patients`;

    try {
      patientFormSchema.parse(patientData);

      await axios.post(url, JSON.stringify(patientData), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // navigate('/login');
      setPatientData({
        full_name: "",
        birth_place: "",
        birth_date: "",
        gender: "",
        domicile: "",
        email: "",
        phone_number: "",
      });
      setErrorValidation(null);
      setErrorBackend("");
      setOpen(true);
    } catch (error: any) {
      console.log(error);
      if (error instanceof ZodError) {
        const errorMsg = new Map();
        error.errors.map((err) => {
          errorMsg.set(err.path.join(), err.message);
        });
        setErrorValidation(errorMsg);
      } else if (error instanceof AxiosError) {
        setErrorValidation(null);
        setErrorBackend(error?.response?.data?.message);
      }
    } finally {
    }
  };

  useEffect(() => {
    console.log(errorValidaton);
  }, [errorValidaton]);

  useEffect(() => {
    if (!role && role !== Role.PATIENT) return;

    const fetchPatientInfo = async () => {
      const url = `${variables.BASE_URL}/users/me`;

      try {
        const { data } = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setPatientData((prev) => ({
          ...prev,
          full_name: data.name,
          email: data.email,
          // fix birth place
          birth_place: data?.birth_place,
          birth_date: data.birth_date,
          gender: data.gender,
          domicile: data.address,
          phone_number: data.phone_number,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientInfo();

    return () =>
      setPatientData({
        full_name: "",
        email: "",
        birth_place: "",
        birth_date: "",
        gender: "",
        domicile: "",
        phone_number: "",
      });
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(patientData);
  }, [patientData]);

  // useEffect(() => {
  //   const fetchEmail = async () => {
  //     const url = `${variables.BASE_URL}/users/me`;

  //     try {
  //       const res = await axios.get(url, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       // console.log(res.data);
  //       setEmail(res.data.email);
  //     } catch (error) {}
  //   };

  //   fetchEmail();
  // }, []);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex min-h-screen w-full font-poppins">
      <Sidebar />
      <div className="bg-gray-100 w-full px-[6rem] py-[2rem]">
        <ModalComponent open={open} handleClose={handleClose} />
        {errorBackend ? (
          <div
            className="bg-red-50 border-s-4 border-red-500 p-4 dark:bg-red-800/30"
            role="alert"
            tabIndex={-1}
            aria-labelledby="hs-bordered-red-style-label"
          >
            <div className="flex">
              <div className="shrink-0">
                {/* <!-- Icon --> */}
                <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
                  <svg
                    className="shrink-0 size-4"
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
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </span>
                {/* <!-- End Icon --> */}
              </div>
              <div className="ms-3">
                <h3
                  id="hs-bordered-red-style-label"
                  className="text-gray-800 font-semibold dark:text-white"
                >
                  Error!
                </h3>
                <p className="text-sm text-gray-700 dark:text-neutral-400">
                  {errorBackend}
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <h1 className="font-medium text-sm mb-4 mt-2">DATA DIRI</h1>
        {role === Role.PATIENT && (
          <div className="flex gap-6 items-center">
            <div className="rounded-full border-2 w-[4rem] h-[4rem] bg-[#B9E5E8]"></div>
            <button className="border-2 text-blue bg-white py-2 px-4 rounded-md h-1/2 text-[#478CCF] font-bold">
              Upload Foto
            </button>
          </div>
        )}

        {/* form pasien */}
        <form className="mt-9 w-full min-h-screen">
          <div className="mb-5 w-full">
            <div className="text-[0.7rem] text-grey-100 font-bold mt-[3rem] mb-[0.8rem]">
              IDENTITAS PENGGUNA
            </div>
            <label
              htmlFor="nama"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              name="full_name"
              value={patientData.full_name}
              onChange={handleChange}
              className={`${
                errorValidaton?.get("full_name") && "border-red-500"
              } border g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              placeholder="Nama Lengkap"
              required
              readOnly={readOnlyInput}
            />
            <ErrorInputMessage name="full_name" errors={errorValidaton} />
          </div>

          <div className="mb-5 flex gap-7 w-full">
            <div className="w-1/2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={patientData.email}
                onChange={handleChange}
                className={`${
                  errorValidaton?.get("email") && "border-red-500"
                } border bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                placeholder="patient@gmail.com"
                readOnly={readOnlyInput}
                required
              />
              <ErrorInputMessage name="email" errors={errorValidaton} />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="jenis-kelamin"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Jenis Kelamin
              </label>
              <select
                id="jenis-kelamin"
                name="gender"
                value={patientData.gender}
                onChange={handleChange}
                className={`${
                  errorValidaton?.get("gender") && "border-red-500"
                } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  readOnlyInput &&
                  "pointer-events-none bg-white cursor-not-allowed"
                }`}
                required
              >
                <option value="" disabled>
                  Pilih Jenis Kelamin
                </option>
                <option value="MALE">Laki-laki</option>
                <option value="FEMALE">Perempuan</option>
              </select>
              <ErrorInputMessage name="gender" errors={errorValidaton} />
            </div>
          </div>

          {/* Tempat & Tanggal Lahir */}
          <div className="mb-5 flex gap-7 w-full">
            <div className="w-1/2">
              <label
                htmlFor="tempatlahir"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tempat Lahir
              </label>
              <input
                type="text"
                id="tempatlahir"
                name="birth_place"
                value={patientData.birth_place}
                onChange={handleChange}
                className={`${
                  errorValidaton?.get("birth_place") && "border-red-500"
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                placeholder="Tempat Lahir"
                required
                readOnly={readOnlyInput}
              />
              <ErrorInputMessage name="birth_place" errors={errorValidaton} />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="tanggal-lahir"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tanggal Lahir
              </label>
              <input
                type="date"
                id="tanggal-lahir"
                name="birth_date"
                value={
                  patientData.birth_date
                    ? patientData.birth_date.split("T")[0]
                    : ""
                }
                onChange={handleChange}
                className={`${
                  errorValidaton?.get("birth_date") && "border-red-500"
                } border px-4 py-2 border rounded-md w-full`}
                readOnly={readOnlyInput}
              />
              <ErrorInputMessage name="birth_date" errors={errorValidaton} />
            </div>
          </div>

          <div className="mb-5 flex gap-7 w-full">
            <div className="w-1/2">
              <label
                htmlFor="tempatlahir"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nomor Telepon
              </label>
              <input
                type="text"
                // id="telpno"
                name="phone_number"
                value={patientData.phone_number}
                onChange={handleChange}
                className={`${
                  errorValidaton?.get("phone_number") && "border-red-500"
                } border bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                placeholder="e.g. 628112345678"
                required
                readOnly={readOnlyInput}
              />
              <ErrorInputMessage name="phone_number" errors={errorValidaton} />
            </div>
          </div>

          {/* Alamat Domisili */}
          <div className="text-[0.7rem] text-grey-100 font-bold mt-[3rem] mb-[0.8rem]">
            ALAMAT IDENTITAS
          </div>
          <div>
            <label
              htmlFor="domicile"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Alamat Domisili
            </label>
            <textarea
              id="domicile"
              rows={4}
              name="domicile"
              value={patientData.domicile}
              onChange={handleChange}
              className={`${
                errorValidaton?.get("domicile") && "border-red-500"
              } border resize-none mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Masukkan Alamat Tempat Tinggal"
              readOnly={readOnlyInput}
            ></textarea>
            <ErrorInputMessage name="domicile" errors={errorValidaton} />
          </div>

          {/* Submit Button */}
          {role === Role.ADMIN && (
            <button
              onClick={() => navigate("../patient")}
              type="submit"
              className="mt-8 mr-3 text-[#478CCF] border-1 bg-white hover:bg-[#ecfdf5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Kembali
            </button>
          )}

          {/* Tombol Submit */}
          {readOnlyInput ? (
            <button
              onClick={handleReadOnlyInput}
              type="submit"
              className="mt-8 mr-3 text-[#478CCF] border-1 border-gray-700 bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit
            </button>
          ) : (
            <button
              type="submit"
              onClick={submitUpdateData}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {role === Role.PATIENT ? "Update" : "Submit"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
