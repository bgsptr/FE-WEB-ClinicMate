import React from "react";
import { RawatJalan } from "../types";

interface OutpatientTableRowProps {
  data: RawatJalan;
  status: string;
}

const OutpatientTableRow: React.FC<OutpatientTableRowProps> = ({
  data,
  status,
}) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        <h1 className="font-semibold">
          {" "}
          {data.rawat_jalan_date
            ? new Date(
                parseInt(data.rawat_jalan_date?.split("-")[0]),
                parseInt(data.rawat_jalan_date?.split("-")[1]),
                parseInt(data.rawat_jalan_date?.split("-")[2])
              )?.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "---"}
        </h1>
        <p className="font-normal">
          {data.queue_start_time?.slice(0, 5) ?? ""}-
          {data.queue_end_time?.slice(0, 5) ?? ""}
        </p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
        {data.queue_no ?? "---"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
        <h1 className="font-semibold">{data.patient_name}</h1>
        <p className="font-normal">NRMF002009</p>
        <p className="font-normal">Reguler</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        dr. {data.doctor_name}
      </td>
      <td className="px-9 py-3 whitespace-nowrap text-sm text-center font-semibold">
        <p
          className={`${
            data.verifikasi_status.toLowerCase() === "pending"
              ? "ml-[2.2rem] bg-yellow-300"
              : data.verifikasi_status.toLowerCase() === "accepted"
              ? "bg-green-300 ml-[3rem]"
              : "bg-red-300 ml-[3rem]"
          } py-1 text-md text-[#000] w-[60%]`}
        >
          {data.verifikasi_status?.slice(0, 1).toUpperCase() +
            data.verifikasi_status?.slice(1).toLowerCase()}
        </p>
        <p className="font-normal">
          {" "}
          {new Date(
            parseInt(data.visit_date?.split("-")[0]),
            parseInt(data.visit_date?.split("-")[1]) - 1,
            parseInt(data.visit_date?.split("-")[2])
          )?.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          , {data.visit_date?.split("T")[1]?.split(".")[0]}
        </p>
      </td>
      <td className="flex justify-center text-center gap-3 h-full py-8">
        {status === "pending" && (
          <>
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
          </>
        )}
      </td>
    </tr>
  );
};

export default OutpatientTableRow;
