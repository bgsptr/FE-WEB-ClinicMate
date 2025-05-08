import { ChangeEvent, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { variables } from "../constants/variable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import postData from "../utils/axios/postData";
import ErrorInputMessage from "../components/ErrorInputMessage";
import scheduleSchema from "../utils/validations/scheduleSchema";
import { ZodError } from "zod";
import ModalComponent from "../components/ModalComponent";
import { getTimestampHourMonth } from "../utils/dayjs/dayjs-util";
// import dayjs from "dayjs";
// import { convertHourMonthStringToTime } from "../utils/dayjs/dayjs-util";

export interface DoctorDropdown {
  id_doctor: string;
  name: string;
}

export interface ScheduleDto {
  id_doctor: string;
  schedule_day: string;
  schedule_start_time: string;
  schedule_end_time: string;
  patient_slot: string | number;
}

interface DayOfWeek {
  id: number;
  name: string;
  value: string;
}

const DoctorSchedule = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [slots, setSlots] = useState<string[]>([]);
  const scheduleInit = {
    id_doctor: "",
    schedule_day: "",
    schedule_start_time: "",
    schedule_end_time: "",
    patient_slot: 0,
  };
  const [scheduleDto, setScheduleDto] = useState<ScheduleDto>(scheduleInit);

  // const clearForm = () => setScheduleDto(scheduleInit);

  const daysOfWeek: DayOfWeek[] = [
    { id: 0, name: "Senin", value: "monday" },
    { id: 1, name: "Selasa", value: "tuesday" },
    { id: 2, name: "Rabu", value: "wednesday" },
    { id: 3, name: "Kamis", value: "thursday" },
    { id: 4, name: "Jumat", value: "friday" },
    { id: 5, name: "Sabtu", value: "saturday" },
    { id: 6, name: "Minggu", value: "sunday" },
  ];

  const [doctors, setDoctors] = useState<DoctorDropdown[]>([]);
  const tempSlot: string[] = [];

  const navigate = useNavigate();

  const [handleScheduleHour, setHandleScheduleHour] = useState({
    startTime: "",
    endTime: "",
    slot: 0,
  });

  const handleChangeScheduleHour = (e: ChangeEvent<HTMLSelectElement>) => {
    setHandleScheduleHour({
      ...handleScheduleHour,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeScheduleData = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    const isSelected =
      name === "schedule_end_time" || name === "schedule_start_time";

    setScheduleDto((prev) => ({
      ...prev,
      [name]: isSelected ? value.concat(":00") : value,
    }));
  };

  useEffect(() => {
    const { startTime } = handleScheduleHour;
    const [hourStart] = startTime.split(":").map(Number);

    let minutesConverted: number = hourStart * 60;

    for (let i = 0; i < handleScheduleHour.slot; ++i) {
      tempSlot.push(
        `${Math.floor(minutesConverted / 60)}:${(minutesConverted % 60)
          .toString()
          .padStart(2, "0")}`
      );
      minutesConverted += 10;
    }

    setSlots(tempSlot);

    setScheduleDto((prev) => ({
      ...prev,
      patient_slot: handleScheduleHour.slot,
    }));

    return () => setSlots([]);
  }, [handleScheduleHour.slot]);

  useEffect(() => {
    const { startTime, endTime } = handleScheduleHour;
    const [hourStart] = startTime.split(":").map(Number);
    const [hourEnd] = endTime.split(":").map(Number);
    console.log(hourStart, hourEnd);
    if (hourStart > hourEnd) return;
    const slot = ((hourEnd - hourStart) * 60) / 10 || 0;
    // console.log(slot)
    setHandleScheduleHour({
      ...handleScheduleHour,
      slot,
    });
  }, [
    handleScheduleHour.slot,
    handleScheduleHour.startTime,
    handleScheduleHour.endTime,
  ]);

  // useEffect(() => {
  //   console.log(handleScheduleHour);
  // }, [handleScheduleHour])

  // useEffect(() => {
  //   console.log(slots);
  // }, [slots])

  useEffect(() => {
    const fetchDoctors = async () => {
      const url = `${variables.BASE_URL}/doctors`;
      try {
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${token}`
          },
          withCredentials: true,
        });

        const doctorsData = res.data.result;
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchDoctors();
  }, []);

  const [errorValidateSchedule, setErrorValidateSchedule] =
    useState<Map<string, string>>();

  useEffect(() => {
    console.log(scheduleDto);
  }, [scheduleDto]);

  const createNewScheduleForDoctor = async () => {
    try {
      scheduleSchema.parse(scheduleDto);

      const url = `${variables.BASE_URL}/schedule`;
      await postData(url, scheduleDto);

      setOpen(true);
      setScheduleDto(scheduleInit);
    } catch (err) {
      console.error(err);
      if (err instanceof ZodError) {
        const mapError: Map<string, string> = new Map();
        err.errors.map((errorValue) => {
          mapError.set(errorValue.path.join('.'), errorValue.message);
        });
        setErrorValidateSchedule((prev) => {
          return new Map([...(prev ?? new Map()), ...mapError]);
        });
      }
    }
  };

  useEffect(() => {
    const startTimestamp = getTimestampHourMonth(handleScheduleHour.startTime);
    const endTimestamp = getTimestampHourMonth(handleScheduleHour.endTime);
    const mapError: Map<string, string> = new Map();
    if (startTimestamp > endTimestamp) {
      setErrorValidateSchedule(
        mapError.set(
          "schedule_end_time",
          `${handleScheduleHour.startTime} cannot be greater than ${handleScheduleHour.endTime}`
        )
      );

      setSlots([]);
      setHandleScheduleHour((prev) => ({
        ...prev,
        slot: 0,
        // endTime: ""
      }))
    } else {
      setErrorValidateSchedule(mapError);
    }
  }, [handleScheduleHour.startTime, handleScheduleHour.endTime]);

  return (
    <div className="flex min-h-screen w-full bg-gray-100 font-poppins">
      <Sidebar />
      <div className="flex-1 px-16 py-8">
        <ModalComponent open={open} handleClose={handleClose} />
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
                <div className="mt-9 w-full min-h-screen">
                  <div className="mb-5 flex gap-7 w-full">
                    {/* Tipe Jadwal field */}
                    <div className="w-1/2">
                      <label
                        htmlFor="doctorField"
                        className="font-bold block mb-2 text-sm text-gray-900 dark:text-white"
                      >
                        Nama Dokter
                      </label>
                      <select
                        id="doctorField"
                        name="id_doctor"
                        onChange={(e) => {
                          // handleChangeScheduleHour(e);
                          handleChangeScheduleData(e);
                        }}
                        className={`${
                          errorValidateSchedule?.get("id_doctor") &&
                          "border-red-500"
                        } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        required
                      >
                        <option value="" disabled selected>
                          Pilih Dokter
                        </option>
                        {doctors.map((doctor) => (
                          <option
                            key={`${doctor.id_doctor}`}
                            value={`${doctor.id_doctor}`}
                          >
                            dr. {doctor.name}
                          </option>
                        ))}
                      </select>
                      <ErrorInputMessage
                        name="id_doctor"
                        errors={errorValidateSchedule!}
                      />
                    </div>

                    {/* Hari Praktik field */}
                    <div className="w-1/2">
                      <label
                        htmlFor="scheduleDay"
                        className="font-bold block mb-2 text-sm text-gray-900 dark:text-white"
                      >
                        Hari Praktik
                      </label>
                      <select
                        id="scheduleDay"
                        name="schedule_day"
                        onChange={(e) => {
                          // handleChangeScheduleHour(e);
                          handleChangeScheduleData(e);
                        }}
                        className={`${
                          errorValidateSchedule?.get("schedule_day") &&
                          "border-red-500"
                        } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        required
                      >
                        <option disabled selected>
                          Pilih Hari Praktik
                        </option>
                        {daysOfWeek.map((day) => (
                          <option key={`${day.id}`} value={`${day.value}`}>
                            {day.name}
                          </option>
                        ))}
                      </select>
                      <ErrorInputMessage
                        name="schedule_day"
                        errors={errorValidateSchedule!}
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
                        name="schedule_start_time"
                        onChange={(e) => {
                          handleChangeScheduleHour(e);
                          handleChangeScheduleData(e);
                        }}
                        className={`${
                          errorValidateSchedule?.get("schedule_start_time") &&
                          "border-red-500"
                        } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        required
                      >
                        <option value="" disabled selected>
                          Pilih Jam Mulai
                        </option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="16:00">16:00</option>
                      </select>
                      <ErrorInputMessage
                        name="schedule_start_time"
                        errors={errorValidateSchedule!}
                      />
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
                        name="schedule_end_time"
                        onChange={(e) => {
                          // const err = new Map();
                          // handleScheduleHour = 16:00, e.target.value = 22:00
                          // console.log("hello: ", dayjs(handleScheduleHour.startTime, "HH:mm:ss").valueOf() > dayjs(e.target.value, "HH:mm:ss").valueOf())
                          // const time = (handleScheduleHour.endTime) // true = strict mode
                          // console.log("Valid (strict):", time);

                          // if (dayjs(handleScheduleHour.startTime, "HH:mm").valueOf() > dayjs(e.target.value, "HH:mm").valueOf()) {
                          //   err.set(e.target.name, `${handleScheduleHour} > ${e.target.value}`)
                          // }
                          handleChangeScheduleHour(e);
                          handleChangeScheduleData(e);
                        }}
                        className={`${
                          errorValidateSchedule?.get("schedule_end_time") &&
                          "border-red-500"
                        } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        required
                      >
                        <option value="" disabled selected>
                          Pilih Jam Selesai
                        </option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="22:00">22:00</option>
                      </select>
                      <ErrorInputMessage
                        name="schedule_end_time"
                        errors={errorValidateSchedule!}
                      />
                    </div>
                  </div>

                  <div className="w-1/4 mb-8 relative">
                    <label
                      htmlFor="hari-praktik"
                      className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                    >
                      Slot Pasien
                    </label>
                    <input
                      type="text"
                      id="hari-praktik"
                      value={handleScheduleHour.slot}
                      className="px-4 py-2 border rounded-md w-full"
                      disabled
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
                    onClick={() => navigate("list")}
                    type="submit"
                    className="mt-8 mr-3 text-[#478CCF] border-1 bg-white hover:bg-[#ecfdf5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Kembali
                  </button>

                  <button
                    onClick={createNewScheduleForDoctor}
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Simpan
                  </button>
                </div>
                {/* form element is div above */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorSchedule;
