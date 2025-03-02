import React from "react";

interface StatusTabsProps {
  status: string;
  setStatus: (status: string) => void;
}

const StatusTabs: React.FC<StatusTabsProps> = ({ status, setStatus }) => {
  return (
    <ul className="flex gap-8 mt-8 mb-[-0.7rem] ml-5 font-semibold">
      <button onClick={() => setStatus("accepted")}>Disetujui</button>
      <button
        onClick={() => setStatus("pending")}
        className="text-[#478CCF] relative"
      >
        Menunggu Konfirmasi
        {status === "pending" && (
          <div className="absolute left-0 top-[2.1rem] w-full border-t-2 border-[#478CCF]"></div>
        )}
      </button>
      <button onClick={() => setStatus("rejected")}>Dibatalkan</button>
    </ul>
  );
};

export default StatusTabs;