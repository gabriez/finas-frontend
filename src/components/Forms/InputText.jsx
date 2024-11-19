import React from "react";

const InputText = (props) => {
  const {
    type = "text",
    name = "",
    placeholder = "",
    handleChange = () => {},
    value = "",
    error = "",
  } = props;

  return (
    <>
      <input
        type={type}
        name={name}
        id={name}
        className="border border-gray-300 py-2 px-2 lg:py-5 lg:px-10 rounded-full w-[100%] 
        focus:border-[#5DF153] outline-none focus:ring focus:ring-[#5DF153]"
        placeholder={placeholder}
        onChange={(e) => {
          handleChange(e);
        }}
        value={value}
      />
      {error.length > 0 && (
        <span className="block w-[100% mt-2 bg-red-500 text-white text-md py-1 px-2 rounded-md">
          {" "}
          {error}{" "}
        </span>
      )}
    </>
  );
};

export default InputText;
