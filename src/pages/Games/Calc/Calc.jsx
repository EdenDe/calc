import React, { useState } from 'react'
import './Calc.scss'

const Calc = () => {
	const [num, setNum] = useState(0)
	const [equation, setEquation] = useState('')

	const calcActions = [
		'C',
		'()',
		'%',
		'/',
		7,
		8,
		9,
		'X',
		4,
		5,
		6,
		'-',
		1,
		2,
		3,
		'+',
		'+/-',
		0,
		'.',
		'=',
	]

	const createTable = (
		<div className='calculator-actions'>
			{calcActions.map((act, idx) => {
				let classNames = typeof act == 'string' ? 'mathematic' : 'number'

				return (
					<button
						key={idx + '' + act}
						className={classNames + ' btn'}
						data-action={act}
						onClick={event => onPress(event)}
					>
						{act}
					</button>
				)
			})}
		</div>
	)

	const onPress = ({ target }) => {
		debugger
		console.log(target)
		if (target.classList.contains('number')) {
			setEquation(prevEquation => prevEquation + target.dataset.action)
		}
	}

	return (
		<section className='calculator'>
			<h1> I can help you with basic math! </h1>
			<h3> try me out :) </h3>

			<div className='math-solution'>
				<span className='res'> {num} </span>
				<span className='equation'> {equation} </span>
			</div>
			{createTable}
		</section>
	)
}

export default Calc
