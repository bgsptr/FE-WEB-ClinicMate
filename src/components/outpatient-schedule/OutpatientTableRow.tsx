import React from "react";
import { RawatJalan } from "../types";

interface OutpatientTableRowProps {
  data: RawatJalan;
}

const OutpatientTableRow: React.FC<OutpatientTableRowProps> = ({ data }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        <h1 className="font-semibold">30 Mei 2023</h1>
        <p className="font-normal">16:00-22:00</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
        {data.queue_no} (21:00)
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
        <h1 className="font-semibold">{data.patient_name}</h1>
        <p className="font-normal">NRMF002009</p>
        <p className="font-normal">Reguler</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
        dr. {data.doctor_name}
      </td>
      <td className="px-9 py-3 whitespace-nowrap text-sm font-semibold">
        <p className="ml-7 bg-yellow-300 py-1 text-md text-center text-[#000] w-1/2">
          {data.verifikasi_status?.toLowerCase()}
        </p>
        <p className="font-normal">30 Mei 2024, 10:32</p>
      </td>
      <td className="flex justify-center text-center gap-3 h-full py-8">
        <button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#4CAF50" />
            <path
              d="M9 12.5L11.5 15L15.5 9"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#F44336" />
            <path
              d="M15 9L9 15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 9L15 15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default OutpatientTableRow;