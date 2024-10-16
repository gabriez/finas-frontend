import React, { useState } from 'react';

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleAccordion} className="w-full flex justify-between items-center focus:outline-none">
        <span className="text-lg font-semibold">{title}</span>
        <span>{isOpen ? '' : ''}</span>
      </button>
      {isOpen && (
        <div className="px-4 absolute bg-[#3CAC38] rounded-md py-2 mt-3 text-white">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;