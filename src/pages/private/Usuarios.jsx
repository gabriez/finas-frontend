import UserList from "../../components/UserList/UserList"
import { TITLE } from "../../constants"

const Usuarios = () => {
	document.title = `${TITLE} - Usuarios`

  return (
    <UserList/>
  )
}

export default Usuarios