import { ReactNode } from "react";

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
  rawat_jalan_date: string;
  queue_start_time: string;
  queue_end_time: string;
}

export interface Props {
  children?: ReactNode;
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

export const Role: {
  ADMIN: "ADMIN";
  DOCTOR: "DOCTOR";
  PATIENT: "PATIENT";
} = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  PATIENT: "PATIENT",
};

export type Role =
  (typeof Role)[keyof typeof Role];
  
export interface OutpatientTableRowProps {
  data: RawatJalan;
  status: string;
}

export interface VerificationOutpatientBody {
  verify_status: boolean
}

export const VerificationStatus: {
  ACCEPTED: 'ACCEPTED'
  REJECTED: 'REJECTED'
  // PENDING: 'PENDING'
} = {
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  // PENDING: 'PENDING'
}

export type VerificationStatus = typeof VerificationStatus[keyof typeof VerificationStatus]


export const Gender: {
  MALE: 'MALE'
  FEMALE: 'FEMALE'
} = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
}

export type Gender = typeof Gender[keyof typeof Gender]

export const PaginationColor: {
  PRIMARY: 'primary'
  SECONDARY: 'secondary',
  STANDARD: 'standard'
} = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  STANDARD: 'standard',
}

export type PaginationColor = typeof PaginationColor[keyof typeof PaginationColor]