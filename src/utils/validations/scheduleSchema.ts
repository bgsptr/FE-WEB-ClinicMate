import z from "zod";

const timeFormat = /^\d{2}:\d{2}:\d{2}$/;

const scheduleSchema = z.object({
  // id_doctor: z.string().uuid("Must be a valid UUID"),
  id_doctor: z
    .string()
    .min(1, "please select the doctor you want to add their schedule"),

  schedule_day: z.enum(
    [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
    {
      errorMap: () => ({
        message: "Must be a valid day, e.g., Senin, Selasa, etc",
      }),
    }
  ),

  schedule_start_time: z
    .string()
    .regex(timeFormat, "Time must be in HH:MM:SS format"),
  schedule_end_time: z
    .string()
    .regex(timeFormat, "Time must be in HH:MM:SS format"),

  patient_slot: z.string().or(z.number()),
});

export default scheduleSchema;
