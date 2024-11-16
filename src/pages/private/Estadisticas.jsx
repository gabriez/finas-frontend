import StatsInterface from "../../components/StatsInterface/StatsInterface"
import { TITLE } from "../../constants"

const Estadisticas = () => {
	document.title = `${TITLE} - Estadísticas`

  return (
    <StatsInterface/>
  )
}

export default Estadisticas