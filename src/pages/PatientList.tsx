import React from "react";
import Sidebar from "../components/Sidebar";

const PatientRegister = () => {
  return (
    <h1 className="flex min-h-screen w-full">
      <div className="w-[16%]">
        <Sidebar />
      </div>
      <div className="px-[4.5rem] py-[2.4rem] bg-gray-100 w-full">
        <h1 className="text-md font-bold text-gray-500 mb-9">Pasien</h1>
        <div className="flex flex-between w-full">
          <div className="flex gap-4 mb-4 w-full">
            <div className="flex justify-between items-center mb-4 w-full">
              <div className="relative flex w-2/3 gap-6">
                <input
                  type="text"
                  placeholder="Cari nama, NIK, no. BPJS, no. MRN..."
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
                  type="date"
                  className="px-4 py-2 border rounded-md w-1/2"
                  placeholder="Pilih tanggal lahir pasien"
                />
              </div>

              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-semibold">
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
                          NO REKAM MEDIS
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
                          KATEGORI
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
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-800">
                          Ngurah Aryawan
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          NRM020089
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          19 Februari 2002
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-normal">
                          <button
                            type="button"
                            className="inline-flex items-center gap-x-2 text-sm rounded-lg border border-transparent hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            Regular
                          </button>
                        </td>
                        <td className="px-6 py-3 w-5 whitespace-nowrap text-sm font-semibold">
                          <p className="bg-blue-100 px-2 py-1 text-md text-center text-[#478CCF]">
                            Active
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
                      <tr className="">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center gap-2">
                          <p>1-1 dari 1</p>
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
            </div>
          </div>
          {/* tabel pasien */}
        </div>
      </div>
    </h1>
  );
};

export default PatientRegister;
