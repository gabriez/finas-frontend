import ProjectList from "../../components/ProjectList/ProjectList"
import { TITLE } from "../../constants"

const Proyectos = () => {
	document.title = `${TITLE} - Proyectos`

  return (
    <ProjectList/>
  )
}

export default Proyectos