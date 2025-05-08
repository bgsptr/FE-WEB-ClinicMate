import { z } from "zod";

const outpatientRegisterSchema = z.object({
  doctorId: z.string(),

  // visitDate: z
  //   .string()
  //   .regex(
  //     /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
  //     "Invalid date format. Use YYYY-MM-DDTHH:mm:ss"
  //   ),

  outpatientQueueDate: z
  .string()
  .regex(
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    "Invalid date format. Use YYYY-MM-DD"
  ),
  
  patientId: z.string(),
});

export default outpatientRegisterSchema;
