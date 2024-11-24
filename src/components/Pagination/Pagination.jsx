import React from "react";
import ButtonAdd from "../Forms/ButtonAdd";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);
  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex justify-center mb-4">
        <ButtonAdd
          classNameCustom="w-[122px] py-2 mx-2"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </ButtonAdd>
        <ButtonAdd
          classNameCustom="w-[122px] py-2 mx-2"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </ButtonAdd>
      </div>
      <div className="flex flex-wrap justify-center">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-4 py-2 mx-1 ${
              number === currentPage
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-black"
            } rounded`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
