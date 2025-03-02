import React from "react";

interface FilterSectionProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onSearch, onFilterChange }) => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-7 w-full">
        <div className="w-[27.5%]">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="" disabled selected>
              Cari Nama Dokter
            </option>
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
          </select>
        </div>
        <div className="w-1/4">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="" disabled selected>
              Semua Hari
            </option>
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
          </select>
        </div>
        <div className="w-1/4 relative">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Cari no RM atau nama pasien"
            onChange={(e) => onSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="absolute top-3 right-5 bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[15%] px-5 py-2.5 text-center"
      >
        + Registrasi
      </button>
    </div>
  );
};

export default FilterSection;