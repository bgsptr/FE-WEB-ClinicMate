import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CustomInput } from "../components/CustomInput";
import Sidebar from "../components/Sidebar";
import postData from "../utils/axios/postData";
import { variables } from "../constants/variable";
import { AlertDialog } from "../components/AlertDialog";

export interface CreateDoctorDto {
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
}

export interface FormDoctorInputError {
  id: string;
  errorMessage: string;
}

export interface ErrorResponse {
  error: string;
  message: FormDoctorInputError[];
  statusCode: number;
}

export const Doctor = () => {
  const [dataPopup, setPopup] = useState(false);
  const [value, setValue] = useState<CreateDoctorDto>({
    name: "",
    phoneNumber: "",
    address: "",
    email: "",
  });

  const [errBackend, setErrBackend] = useState<FormDoctorInputError[]>([]);

  const changeDoctorData = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  const submitDoctorData = async () => {
    const url = `${variables.BASE_URL}/doctors`;
    try {
      await postData(url, value);

      setPopup(true);
    } catch (err: any | ErrorResponse) {
      console.error(err);

      const { error, message } = err.response.data;

      console.log(err);

      if (error === "validate") {
        setErrBackend(message);
      }
    }
  };

  const formSubmitDoctorData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitDoctorData();
  };

  return (
    <div className="flex min-h-screen w-full font-poppins">
      <Sidebar />

      {dataPopup ? (
        <AlertDialog popup={dataPopup} setPopup={setPopup} />
      ) : (
        <div className="flex-1 px-[6rem] py-[4rem] bg-gray-100">
          <div className="text-xs text-gray-500 uppercase font-bold bg-white rounded-lg">
            <h1 className="px-9 py-5">Data Dokter</h1>
          </div>
          <div className="border-2"></div>

          {/* form pasien */}
          <form
            className="w-full bg-white py-[0.2rem] px-[2rem]"
            method="POST"
            onSubmit={formSubmitDoctorData}
          >
            <div className="mb-5 w-full">
              <div className="text-[0.7rem] text-grey-100 font-bold mt-[2rem] mb-[0.8rem] px-[0.5rem]">
                IDENTITAS PENGGUNA
              </div>
              <CustomInput
                labelName="Nama Dokter"
                inputId="name"
                value={value}
                inputChange={changeDoctorData}
                err={errBackend}
              />
            </div>

            <div className="mb-5 flex gap-7 w-full">
              <div className="w-1/2">
                <CustomInput
                  labelName="No Telp"
                  inputId="phoneNumber"
                  value={value}
                  inputChange={changeDoctorData}
                  err={errBackend}
                />
              </div>
              <div className="w-1/2"></div>
            </div>

            <div className="mb-5 flex gap-7 w-full">
              <div className="w-1/2">
                <CustomInput
                  labelName="Email"
                  inputId="email"
                  value={value}
                  inputChange={changeDoctorData}
                  err={errBackend}
                />
              </div>
              <div className="w-1/2">
                {/* Tambahkan input lain jika perlu */}
              </div>
            </div>

            <div className="text-[0.7rem] text-grey-100 font-bold mt-[3rem] mb-[0.8rem] px-[0.5rem]">
              ALAMAT IDENTITAS
            </div>

            <div className="mb-5 flex gap-7 w-full">
              <div className="w-1/2">
                <CustomInput
                  labelName="Alamat"
                  inputId="address"
                  value={value}
                  inputChange={changeDoctorData}
                  err={errBackend}
                />
              </div>
              <div className="w-1/2"></div>
            </div>

            <button
              type="submit"
              className="my-8 ml-3 text-[#478CCF] border-1 bg-white hover:bg-[#ecfdf5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
