import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import fetchData from "../utils/axios/fetchData";
import { variables } from "../constants/variable";

export interface QueueOutpatientData {
  queue_no: number;
  patient_id: string;
  patient_name: string;
  doctor_id: string;
  doctor_name: string;
  start_consult_time: string;
  end_consult_time: string;
}

export interface DashboardQueueData {
  total_patient: number;
  total_queue_processed: number;
  total_queue_finished: number;
  today_total_queue: number;
  current_queue_patient: QueueOutpatientData;
  next_queue_patient: QueueOutpatientData;
}

const Dashboard = () => {
  // const reducer = (state, action) => {

  // }

  const dashboardQueueInit = {
    total_patient: 0,
    total_queue_processed: 0,
    total_queue_finished: 0,
    today_total_queue: 0,
    current_queue_patient: {
      queue_no: 0,
      patient_id: "",
      patient_name: "",
      doctor_id: "",
      doctor_name: "",
      start_consult_time: "",
      end_consult_time: "",
    },
    next_queue_patient: {
      queue_no: 0,
      patient_id: "",
      patient_name: "",
      doctor_id: "",
      doctor_name: "",
      start_consult_time: "",
      end_consult_time: "",
    },
  };

  const [dashboardQueue, setDashboardQueue] = useState(dashboardQueueInit);

  // const [state, dispatch] = useReducer(reducer, dashboardQueueInit)

  const fetchDashboardQueueData = async () => {
    console.log(variables);
    const url = `${variables.BASE_URL}/notifications/queue`;
    const result = await fetchData(url);

    console.log(result);
    setDashboardQueue(result);
  };

  useEffect(() => {
    fetchDashboardQueueData();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen w-full font-poppins">
      <Sidebar />
      <div className="ml-[20%] mt-[-5%] p-6">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Dokter Umum Section */}
          <div className="w-full lg:w-2/3 bg-white text-center py-8 rounded-lg shadow-sm">
            <div className="flex flex-col justify-center items-center h-full">
              <h3 className="mb-5 font-semibold text-xl">Dokter Umum</h3>
              <h3 className="mb-2 font-normal text-sm">
                Panggilan Antrian Pasien
              </h3>
              <h1 className="mb-2 font-bold text-4xl text-[#478CCF]">
                {dashboardQueue?.current_queue_patient?.queue_no}
              </h1>
              <p className="mb-2 font-bold text-xl">
                {dashboardQueue?.current_queue_patient?.patient_name}
              </p>
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
                <h1 className="font-semibold text-md">Total Pasien</h1>
                <p className="font-medium">{dashboardQueue.total_patient}</p>
              </div>
            </div>
            <div className="bg-white p-4 flex gap-6 items-center mb-3 rounded-lg shadow-sm">
              <img
                src="/public/done-patient.jpg"
                className="w-[4rem] h-[4rem]"
                alt="List Antrian Sudah Selesai"
              />
              <div>
                <h1 className="font-semibold text-md">
                  List Antrian Sudah Selesai
                </h1>
                <p className="font-medium">
                  {dashboardQueue.total_queue_finished}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 flex gap-6 items-center mb-3 rounded-lg shadow-sm">
              <img
                src="/public/waiting-patient.jpg"
                className="w-[4rem] h-[4rem]"
                alt="List Antrian Belum Selesai"
              />
              <div>
                <h1 className="font-semibold text-md">
                  List Antrian Belum Selesai
                </h1>
                <p className="font-medium">
                  {dashboardQueue.total_queue_processed}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 flex gap-6 items-center mb-3 rounded-lg shadow-sm">
              <img
                src="/public/total-people.jpg"
                className="w-[4rem] h-[4rem]"
                alt="Jumlah Pasien Hari Ini"
              />
              <div>
                <h1 className="font-semibold text-md">
                  Jumlah Pasien Hari Ini
                </h1>
                <p className="font-medium">
                  {dashboardQueue.today_total_queue}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Queue Information Section */}
        <div className="bg-white mt-6 p-6 rounded-lg shadow-sm w-full lg:w-2/5">
          <h1 className="font-bold text-lg mb-6">Antrian Pasien Dokter Umum</h1>
          <div className="mt-3 text-gray-500 flex items-center">
            <p className="mr-[2rem]">Sedang Dilayani</p>
            <span className="text-[#478CCF] font-bold mr-[0.8rem]">
              {dashboardQueue?.current_queue_patient?.queue_no}
            </span>
            <span className="text-black font-bold">
              {dashboardQueue?.current_queue_patient?.patient_name}
            </span>
          </div>
          <div className="mt-5 text-gray-500 flex items-center">
            <p className="mr-[4.3rem]">Selanjutnya</p>
            <span className="text-[#478CCF] font-bold mr-[0.8rem]">
              {dashboardQueue?.next_queue_patient?.queue_no}
            </span>
            <span className="text-black font-bold">
              {dashboardQueue?.next_queue_patient?.patient_name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
