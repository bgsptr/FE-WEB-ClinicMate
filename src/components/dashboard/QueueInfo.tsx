import React from "react";

interface QueueInfoProps {
  status: string;
  queueNumber: string;
  patientName: string;
}

const QueueInfo: React.FC<QueueInfoProps> = ({ status, queueNumber, patientName }) => {
  return (
    <div className="mt-3 text-gray-500 flex items-center">
      <p className="mr-[2rem]">{status}</p>
      <span className="text-[#478CCF] font-bold mr-[0.8rem]">{queueNumber}</span>
      <span className="text-black font-bold">{patientName}</span>
    </div>
  );
};

export default QueueInfo;