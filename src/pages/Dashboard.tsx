import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="bg-gray-200 min-h-screen w-full relative">
      <Sidebar />
      <div className="flex gap-9 absolute left-[20%] top-5 right-0">
        <div className="w-2/3 h-1/2 bg-white text-center py-[8rem]">
          <h3 className="mb-5 font-semibold text-xl">Dokter Umum</h3>
          <h3 className="mb-2 font-normal text-sm">Panggilan Antrian Pasien</h3>
          <h1 className="mb-2 font-bold text-4xl text-[#478CCF]">030</h1>
          <p className="mb-2 font-bold text-xl">Ngurah Aryawan</p>
        </div>
        <div className="w-1/2">
          <div className="bg-white p-4 flex w-4/5 gap-6 items-center mb-3">
            <img
              src="/public/pasien-hari-ini.png"
              className="w-[4rem] h-[4rem]"
              alt=""
            />
            <div className="">
              <h1 className="font-bold">Total Pasien</h1>
              <p className="font-semibold">822</p>
            </div>
          </div>
          <div className="bg-white p-4 flex w-4/5 gap-6 items-center mb-3">
            <img
              src="/public/done-patient.jpg"
              className="w-[4rem] h-[4rem]"
              alt=""
            />
            <div className="">
              <h1 className="font-bold">List Antrian Sudah Selesai</h1>
              <p className="font-semibold">800</p>
            </div>
          </div>
          <div className="bg-white p-4 flex w-4/5 gap-6 items-center mb-3">
            <img
              src="/public/waiting-patient.jpg"
              className="w-[4rem] h-[4rem]"
              alt=""
            />
            <div className="">
              <h1 className="font-bold">List Antrian Belum Selesai</h1>
              <p className="font-semibold">22</p>
            </div>
          </div>
          <div className="bg-white p-4 flex w-4/5 gap-6 items-center mb-3">
            <img
              src="/public/total-people.jpg"
              className="w-[4rem] h-[4rem]"
              alt=""
            />
            <div className="">
              <h1 className="font-bold">Jumlah Pasien Hari Ini</h1>
              <p className="font-semibold">70</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex absolute left-[20%] top-[70%] right-0 bg-white mt-2 w-2/5 flex-col px-8 py-5">
        <h1 className="mt-2 font-bold mb-6">Antrian Pasien Dokter Umum</h1>
        <h6 className="mt-3 text-gray-500 flex">
          <p className="mr-[2rem]">Sedang Dilayani</p>
          <span className="text-[#478CCF] font-bold mr-[0.8rem]">030</span>
          <span className="text-black font-bold">Ngurah Aryawan</span>
        </h6>
        <h6 className="mt-5 text-gray-500 flex">
          <p className="mr-[4rem]">Selanjutnya</p>
          <span className="text-[#478CCF] font-bold mr-[0.8rem]">031</span>
          <span className="text-black font-bold">Rahmang</span>
        </h6>
      </div>
    </div>
  );
};

export default Dashboard;
