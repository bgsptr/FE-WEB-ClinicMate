import Sidebar from "../components/Sidebar";

const RawatJalanRegister = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="bg-gray-100 w-full px-[6rem] py-[2rem] flex flex-col gap-7">
        <div className="flex items-center gap-4">
          <h3 className="text-[#478CCF] font-bold">Rawat Jalan</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            class="bi bi-chevron-right"
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
            class="bi bi-chevron-right"
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
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Ketik Nama Lengkap"
                      required
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
                    className="mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Masukkan Alamat Tempat Tinggal"
                  ></textarea>
                </div>

                <div className="w-full mb-8">
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
                  </div>


                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>

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
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Isi Nomor Telepon Pasien"
                    required
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
                    placeholder="Ketik Email"
                    required
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
                  id="jenis-kelamin"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="" disabled selected>
                    Pilih Dokter yang Tersedia
                  </option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
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
                    className="px-4 py-2 border rounded-md w-full"
                  />
                </div>

                <div className="w-1/2">
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
                </div>
              </div>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RawatJalanRegister;
