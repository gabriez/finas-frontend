import React from 'react';


const Table = ({ children, dataMap, classNameCustom }) => {
  return (
    <table className={classNameCustom+"table-auto bg-white rounded-[20px] overflow-hidden"}>
      <thead className="h-20 rounded-[20px] text-left ">
        {children}
      </thead>
      <tbody className="text-[#063a0a] text-xl font-light font-['Poppins'] text-left">
        {dataMap}
      </tbody>
    </table>
  );
};

export default Table