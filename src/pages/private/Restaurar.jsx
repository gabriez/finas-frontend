import RestoreInterface from "../../components/RestoreInterface/RestoreInterface"
import { TITLE } from "../../constants"

const Restaurar = () => {
	document.title = `${TITLE} - Restaurar`

  return (
    <RestoreInterface/>
  )
}

export default Restaurar