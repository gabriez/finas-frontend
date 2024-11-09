import OfficialList from "../../components/OfficialsList/OfficialList"
import { TITLE } from "../../constants"

const Funcionarios = () => {
	document.title = `${TITLE} - Funcionarios`

    return (
      <OfficialList/>
    )
  }
  
  export default Funcionarios