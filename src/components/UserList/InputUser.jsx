import React from "react";

const InputUser = (props) => {
	const {
		type = "text",
		name = "",
		placeholder = "",
		handleChange = () => {},
		value = "",
		label = "",
        error = ""
	} = props;

	return (
		<>
			<label
				className="block text-gray-700 text-md lg:text-lg  font-bold mt-2"
				htmlFor="username">
				{label}
			</label>

			<input
				placeholder={placeholder}
				onChange={handleChange}
				value={value}
				type={type}
				name={name}
				// id={name}
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			/>

            {error.length > 0 && <span className="bg-red-500 text-white text-md py-1 px-2 rounded-md"> {error} </span>}
		</>
	);
};

export default InputUser;
