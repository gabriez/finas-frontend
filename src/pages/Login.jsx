import FormLogin from "../components/FormLogin"

const Login = () => {
  return (
    <form>
        <div>
            <label htmlFor="email" className="text-md">Correo</label>
            <input type="email" name="email" id="email" />
        </div>
        <div>
            <label htmlFor="password" className="text-">Contraseña</label>
            <input type="password" name="password" id="password" />
        </div>
        <FormLogin/>
    </form>
  )
}

export default Login