import React from "react";

interface StatCardProps {
  icon: string;
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-4 flex w-full gap-6 items-center mb-3 rounded-lg shadow-sm">
      <img src={icon} className="w-[4rem] h-[4rem]" alt={title} />
      <div>
        <h1 className="font-bold text-lg">{title}</h1>
        <p className="font-semibold text-xl">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;