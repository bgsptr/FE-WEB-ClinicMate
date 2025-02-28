import Sidebar from "../components/Sidebar";

const PatientDetail = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-100 font-poppins">
      <Sidebar />
      <div className="flex-1 px-16 py-8">
        <div className="flex items-center gap-3 mb-[3rem]">
          <h1 className="text-md font-bold mb-4 text-[#478CCF]">Pasien</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi bi-chevron-right mb-3"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
          <h1 className="text-md font-bold text-gray-700 mb-4">Bagus Tegar</h1>
        </div>

        <ul className="flex gap-8 mt-8 ml-5 mb-8 font-semibold">
          <li className="text-[#478CCF] relative">
            Informasi Pasien
            <div className="absolute left-0 top-[2.5rem] w-full border-t-2 border-[#478CCF]"></div>
          </li>
          <li className="">Riwayat Kunjungan</li>

          {/* <li>Selesai Konsultasi</li> */}
          <li></li>
          <li></li>
        </ul>

        <div className="border-1 mt-[-1rem] mb-8"></div>

        <div className="flex gap-8">
          {/* Main patient information table */}
          <div className="bg-white rounded-lg shadow-lg w-3/4 p-6">
            <h2 className="text-md font-semibold text-gray-600 mb-6">
              DATA PASIEN
            </h2>
            <div className="border-b-2 border-gray-200 mb-6"></div>

            <h3 className="text-sm font-medium text-gray-500 mb-[1.3rem]">
              DATA DIRI
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-300"></div>
              <div>
                <div className="font-semibold">Nama Lengkap</div>
                <p>Bagus Tegar</p>
              </div>
            </div>

            {/* Personal details */}
            <div className="grid grid-cols-2 gap-y-[3rem] gap-x-6 mt-[3rem]">
              <div>
                <h4 className="font-semibold text-gray-700">No. Rekam Medis</h4>
                <p>MDFJ000284</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">No. Telepon</h4>
                <p>081338494371</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">NIK</h4>
                <p>510303081004039</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Tempat Lahir</h4>
                <p>Denpasar</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Tanggal Lahir</h4>
                <p>08 Februari 1996 (28 tahun)</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Alamat Rumah</h4>
                <p>Jalan Pantai Soka no:1x</p>
              </div>
            </div>
          </div>

          {/* Sidebar actions */}
          <div className="bg-white w-1/4 p-6 rounded-lg shadow-lg flex flex-col gap-4">
            <button className="py-2 px-4 rounded border border-blue-500 bg-blue-500 text-white font-semibold hover:bg-blue-600 text-[#478CCF]">
              Edit Pasien
            </button>
            <button className="py-2 px-4 rounded border border-gray-300 font-semibold hover:bg-gray-100 text-[#478CCF]">
              Riwayat Rekam Medis
            </button>
            <button className="py-2 px-4 rounded border border-gray-300 font-semibold hover:bg-gray-100 text-[#478CCF]">
              Buat Registrasi
            </button>
            <button className="py-2 px-4 rounded border border-gray-300 font-semibold hover:bg-gray-100 text-[#478CCF]">
              Buat Reservasi
            </button>

            <div className="border-1"></div>

            <div className="flex gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-check-circle text-green-500 mt-3"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  fill="none"
                />
                <polyline
                  points="9 12 12 15 16 9"
                  stroke="currentColor"
                  fill="none"
                />
              </svg>
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Status Pasien</h1>
                <p>Aktif</p>
              </div>
            </div>
            <div className="border-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
