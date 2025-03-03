export interface RawatJalan {
  id_rawat_jalan: string;
  id_patient: string;
  id_doctor: string;
  visit_date: string;
  status_rawat_jalan: string;
  verifikasi_status: string;
  doctor_name: string;
  patient_name: string;
  queue_no: number;
  queue_status: string;
  id_queue: number;
}

export const MessageSenderProfile: {
  USER: "USER";
  BOT: "BOT";
} = {
  USER: "USER",
  BOT: "BOT",
};

export type MessageSenderProfile =
  (typeof MessageSenderProfile)[keyof typeof MessageSenderProfile];
