import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const PatientRegister = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Toggle the sidebar open/close
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Toggle accordion items
  const handleAccordionToggle = (index) => {
    setOpenAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="bg-gray-100 w-full px-[6rem] py-[2rem]">
        <h1 className="font-medium text-sm mb-4">DATA DIRI</h1>
        <div className="flex gap-6 items-center">
          <div className="rounded-full border-2 w-[4rem] h-[4rem] bg-[#B9E5E8]"></div>
          <button className="border-2 text-blue bg-white py-2 px-4 rounded-md h-1/2 text-[#478CCF] font-bold">
            Upload Foto
          </button>
        </div>

        {/* form pasien */}
        <form className="mt-9 w-full min-h-screen">
          <div className="mb-5 w-full">
            <div className="text-[0.7rem] text-grey-100 font-bold mt-[3rem] mb-[0.8rem]">
              IDENTITAS PENGGUNA
            </div>
            <label
              htmlFor="nama"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nama Lengkap"
              required
            />
          </div>

          <div className="mb-5 flex gap-7 w-full">
            {/* Email field */}
            <div className="w-1/2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
                required
              />
            </div>

            {/* Jenis Kelamin field */}
            <div className="w-1/2">
              <label
                htmlFor="jenis-kelamin"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Jenis Kelamin
              </label>
              <input
                type="date"
                className="px-4 py-2 border rounded-md w-full"
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
                placeholder="Tempat Lahir"
                required
              />
            </div>

            {/* Jenis Kelamin field */}
            <div className="w-1/2">
              <label
                htmlFor="jenis-kelamin"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Jenis Kelamin
              </label>
              <select
                id="jenis-kelamin"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="" disabled selected>
                  Pilih Jenis Kelamin
                </option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>
          </div>
          {/* tempat tgl lahir */}

          <div className="text-[0.7rem] text-grey-100 font-bold mt-[3rem] mb-[0.8rem]">
            ALAMAT IDENTITAS
          </div>
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
              className="mb-8 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Alamat Tempat Tinggal"
            ></textarea>
          </div>
          {/* kelurahan */}
          <div className="mb-5 flex gap-7 w-full">
            {/* Email field */}
            <div className="w-1/2">
              <label
                htmlFor="tempatlahir"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Desa/Kelurahan
              </label>
              <input
                type="text"
                id="tempatlahir"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Pilih Kelurahan"
                required
              />
            </div>

            {/* Jenis Kelamin field */}
            <div className="w-1/2">
              <label
                htmlFor="jenis-kelamin"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Kabupaten
              </label>
              <input
                type="text"
                id="kabupaten"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Pilih Kabupaten"
                required
              />
            </div>
          </div>
          {/* tempat tgl lahir */}

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        {/* form pasien */}
      </div>
    </div>
  );
};

export default PatientRegister;
