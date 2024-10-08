import { useState } from "react";
import { Link } from "react-router-dom";
import InputText from "../../components/Forms/InputText";
import { ROUTES } from "../../routes/Routes";
import ButtonSubmit from "../../components/Forms/ButtonSubmit";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    text: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="flex-col">
        <div className="pb-2">
          <InputText
            type="email"
            name="email"
            placeholder="Email"
            handleChange={handleChange}
            value={formData.email}
          />
        </div>
        <ButtonSubmit text="Restablecer" />
      </form>
    </>
  );
};

export default ForgotPassword;
