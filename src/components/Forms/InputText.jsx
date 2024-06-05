const InputText = (props) => {
    const { type = "text", name = "", placeholder = "", handleChange = () => {}, value=""} = props;

  return (
    <input type={type} name={name} id={name} 
        className="border border-gray-300 py-5 px-10 rounded-full w-[100%] 
        focus:border-[#5DF153] outline-none focus:ring focus:ring-[#5DF153]" 
        placeholder={placeholder} 
        onChange={(e) => {handleChange(e)}}
        value={value}
        />
    )
}

export default InputText