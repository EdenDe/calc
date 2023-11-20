import { useEffect, useState } from 'react'
import Calc from '../Games/Calc/Calc'

function Home() {
	const [num, setNum] = useState(0)

	return <Calc />
}

export default Home
