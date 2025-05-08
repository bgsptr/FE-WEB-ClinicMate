import { number, z } from "zod";

const outpatientScheduleSchema = z.object({
  queueNo: z.string().or(number()),

  // outpatientQueueDate: z
  //   .string()
  //   .regex(
  //     /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  //     "Invalid date format. Use YYYY-MM-DD"
  //   ),
});

export default outpatientScheduleSchema;
