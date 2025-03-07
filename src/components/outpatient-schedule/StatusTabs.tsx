import React from "react";

interface StatusTabsProps {
  status: string;
  setStatus: (status: string) => void;
}

const StatusTabs: React.FC<StatusTabsProps> = ({ status, setStatus }) => {
  return (
    <ul className="flex gap-8 mt-8 mb-[-0.7rem] ml-5 font-semibold">
      <li>
        <button
          onClick={() => setStatus("accepted")}
          className={`relative pb-2 ${
            status === "accepted" ? "text-[#478CCF]" : "text-gray-500"
          }`}
        >
          Disetujui
          {status === "accepted" && (
            <span className="absolute left-0 bottom-[-30%] w-full h-0.5 bg-[#478CCF] transition-all duration-300"></span>
          )}
        </button>
      </li>
      <li>
        <button
          onClick={() => setStatus("pending")}
          className={`relative pb-2 ${
            status === "pending" ? "text-[#478CCF]" : "text-gray-500"
          }`}
        >
          Menunggu Konfirmasi
          {status === "pending" && (
            <span className="absolute left-0 bottom-[-30%] w-full h-0.5 bg-[#478CCF] transition-all duration-300"></span>
          )}
        </button>
      </li>
      <li>
        <button
          onClick={() => setStatus("rejected")}
          className={`relative pb-2 ${
            status === "rejected" ? "text-[#478CCF]" : "text-gray-500"
          }`}
        >
          Dibatalkan
          {status === "rejected" && (
            <span className="absolute left-0 bottom-[-30%] w-full h-0.5 bg-[#478CCF] transition-all duration-300"></span>
          )}
        </button>
      </li>
    </ul>
  );
};

export default StatusTabs;