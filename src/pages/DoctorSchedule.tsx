import { ChangeEvent, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { variables } from "../constants/variable";
import axios from "axios";

export interface DoctorDropdown {
  id_doctor: string;
  name: string;
}

const DoctorSchedule = () => {

  const [slots, setSlots] = useState<string[]>([]);
  const [token] = useState(localStorage.getItem("token"));
  const [doctors, setDoctors] = useState<DoctorDropdown[]>([]);
  const tempSlot: string[] = [];

  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  ];

  const [handleScheduleHour, setHandleScheduleHour] = useState({
    startTime: "",
    endTime: "",
    slot: 0
  });

  const handleChangeScheduleHour = (e: ChangeEvent<HTMLSelectElement>) => {
    setHandleScheduleHour({
      ...handleScheduleHour,
      [e.target.id]: e.target.value
    })
  };

  useEffect(() => {
    const { startTime, endTime } = handleScheduleHour;
    const [hourStart, minuteStart] = startTime.split(':').map(Number);

    let minutesConverted: number = hourStart * 60;

    for (let i = 0; i < handleScheduleHour.slot; ++i) {
      tempSlot.push(`${Math.floor(minutesConverted / 60)}:${(minutesConverted % 60).toString().padStart(2, "0")}`);
      minutesConverted += 10
    }

    setSlots(tempSlot);

    return () => setSlots([])

  }, [handleScheduleHour.slot])

  useEffect(() => {
    const { startTime, endTime } = handleScheduleHour;
    const [hourStart, minuteStart] = startTime.split(':').map(Number);
    const [hourEnd, minuteEnd] = endTime.split(':').map(Number);
    console.log(hourStart, hourEnd)
    if (hourStart > hourEnd) return;
    const slot = (hourEnd - hourStart) * 60 / 10 || 0;
    // console.log(slot)
    setHandleScheduleHour({
      ...handleScheduleHour,
      slot
    })
  }, [handleScheduleHour.slot, handleScheduleHour.startTime, handleScheduleHour.endTime])

  // useEffect(() => {
  //   console.log(handleScheduleHour);
  // }, [handleScheduleHour])

  // useEffect(() => {
  //   console.log(slots);
  // }, [slots])

  useEffect(() => {
    const fetchDoctors = async () => {
      const url = `${variables.BASE_URL}/doctors`
      try {
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        });
  
        const doctorsData = res.data.result;
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }

    fetchDoctors();
  }, [])

  return (
    <div className="flex min-h-screen w-full bg-gray-100 font-poppins">
      <Sidebar />
      <div className="flex-1 px-16 py-8">
        <div className="flex items-center gap-3 mb-[3rem]">
          <h3 className="text-[#478CCF] font-bold">Jadwal Dokter</h3>
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
          <h3 className="font-semibold">Buat / Edit Jadwal</h3>
        </div>

        <table className="min-w-full divide-y divide-gray-200 bg-white min-h-screen">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 pt-5 pb-3 text-start text-xs text-gray-500 uppercase font-bold"
              >
                JADWAL NAKES
              </th>
            </tr>
            <div className="border-2 mt-2"></div>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 pt-5 pb-3">
                {/* form pasien */}
                <form className="mt-9 w-full min-h-screen">
                  <div className="mb-5 flex gap-7 w-full">
                    {/* Tipe Jadwal field */}
                    <div className="w-1/2">
                      <label
                        htmlFor="tipe-jadwal"
                        className="font-bold block mb-2 text-sm text-gray-900 dark:text-white"
                      >
                        Nama Dokter
                      </label>
                      <input
                        type="text"
                        id="tipe-jadwal"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Regular"
                        value="dr. Ngurah Baskara"
                        required
                        disabled
                      />
                    </div>

                    {/* Hari Praktik field */}
                    <div className="w-1/2">
                      <label
                        htmlFor="hari-praktik"
                        className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                      >
                        Hari Praktik
                      </label>
                      <input
                        type="text"
                        id="hari-praktik"
                        value="Senin"
                        className="px-4 py-2 border rounded-md w-full"
                        disabled
                      />
                    </div>
                  </div>

                  {/* Jam Praktik */}
                  <div className="mb-5 flex gap-7 w-full">
                    {/* Jam Praktik Dimulai */}
                    <div className="w-1/2">
                      <label
                        htmlFor="jam-praktik-dimulai"
                        className="font-bold block mb-2 text-sm text-gray-900 dark:text-white"
                      >
                        Jam Praktik Dimulai
                      </label>
                      <select
                        id="startTime"
                        onChange={handleChangeScheduleHour}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      >
                        <option value="" disabled selected>
                          Pilih Jam Mulai
                        </option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">16:00</option>
                      </select>
                    </div>

                    {/* Jam Praktik Berakhir */}
                    <div className="w-1/2">
                      <label
                        htmlFor="jam-praktik-berakhir"
                        className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                      >
                        Jam Praktik Berakhir
                      </label>
                      <select
                        id="endTime"
                        onChange={handleChangeScheduleHour}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      >
                        <option value="" disabled selected>
                          Pilih Jam Selesai
                        </option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">22:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-1/4 mb-8 relative">
                    <label
                      htmlFor="hari-praktik"
                      className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                    >
                      Hari Praktik
                    </label>
                    <input
                      type="text"
                      id="hari-praktik"
                      value={handleScheduleHour.slot}
                      className="px-4 py-2 border rounded-md w-full"
                    />
                    <div className="absolute right-7 top-9 font-light text-gray-600">
                      slot
                    </div>
                  </div>

                  <div className="pt-5 pb-3 text-start text-xs text-gray-500 uppercase font-bold">
                    Slot Antrian
                  </div>

                  <div className="grid grid-cols-6 gap-4">
                    {slots.map((slot, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-3 text-center rounded text-sm"
                      >
                        {slot}
                      </div>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-8 mr-3 text-[#478CCF] border-1 bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Kembali
                  </button>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Simpan
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorSchedule;
