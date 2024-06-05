
const ButtonSubmit = (props) => {
    const {text = ""} = props;
  return (
    <button type="submit" className=" py-5 px-20 rounded-full bg-[#5DF153] font-bold text-[#333] w-[100%] box-shadow-md">{text}</button>
)
}

export default ButtonSubmit