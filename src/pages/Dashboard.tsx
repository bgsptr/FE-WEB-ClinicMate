import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="bg-gray-200 min-h-screen w-full">
      <Sidebar />
      <div className="ml-[20%] mt-[-5%] p-6">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Dokter Umum Section */}
          <div className="w-full lg:w-2/3 bg-white text-center py-8 rounded-lg shadow-sm">
            <div className="flex flex-col justify-center items-center h-full">
              <h3 className="mb-5 font-semibold text-xl">Dokter Umum</h3>
              <h3 className="mb-2 font-normal text-sm">Panggilan Antrian Pasien</h3>
              <h1 className="mb-2 font-bold text-4xl text-[#478CCF]">030</h1>
              <p className="mb-2 font-bold text-xl">Ngurah Aryawan</p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-4 flex gap-6 items-center mb-3 rounded-lg shadow-sm">
              <img
                src="/public/pasien-hari-ini.png"
                className="w-[4rem] h-[4rem]"
                alt="Total Pasien"
              />
              <div>
                <h1 className="font-bold">Total Pasien</h1>
                <p className="font-semibold">822</p>
              </div>
            </div>
            <div className="bg-white p-4 flex gap-6 items-center mb-3 rounded-lg shadow-sm">
              <img
                src="/public/done-patient.jpg"
                className="w-[4rem] h-[4rem]"
                alt="List Antrian Sudah Selesai"
              />
              <div>
                <h1 className="font-bold">List Antrian Sudah Selesai</h1>
                <p className="font-semibold">800</p>
              </div>
            </div>
            <div className="bg-white p-4 flex gap-6 items-center mb-3 rounded-lg shadow-sm">
              <img
                src="/public/waiting-patient.jpg"
                className="w-[4rem] h-[4rem]"
                alt="List Antrian Belum Selesai"
              />
              <div>
                <h1 className="font-bold">List Antrian Belum Selesai</h1>
                <p className="font-semibold">22</p>
              </div>
            </div>
            <div className="bg-white p-4 flex gap-6 items-center mb-3 rounded-lg shadow-sm">
              <img
                src="/public/total-people.jpg"
                className="w-[4rem] h-[4rem]"
                alt="Jumlah Pasien Hari Ini"
              />
              <div>
                <h1 className="font-bold">Jumlah Pasien Hari Ini</h1>
                <p className="font-semibold">70</p>
              </div>
            </div>
          </div>
        </div>

        {/* Queue Information Section */}
        <div className="bg-white mt-6 p-6 rounded-lg shadow-sm w-full lg:w-2/5">
          <h1 className="font-bold text-xl mb-6">Antrian Pasien Dokter Umum</h1>
          <div className="mt-3 text-gray-500 flex items-center">
            <p className="mr-[2rem]">Sedang Dilayani</p>
            <span className="text-[#478CCF] font-bold mr-[0.8rem]">030</span>
            <span className="text-black font-bold">Ngurah Aryawan</span>
          </div>
          <div className="mt-5 text-gray-500 flex items-center">
            <p className="mr-[4rem]">Selanjutnya</p>
            <span className="text-[#478CCF] font-bold mr-[0.8rem]">031</span>
            <span className="text-black font-bold">Rahmang</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;