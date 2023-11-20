import React, { useEffect, useState } from 'react'
import './Calc.scss'

const Calc = () => {
	const [res, setRes] = useState(0)
	const [equation, setEquation] = useState([])

	const calcActions = [
		'C',
		'^',
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

	useEffect(() => {
		if (!isPrevNumber()) return

		try {
			let temp = equation.join(' ').replaceAll('X', '*')
			temp = temp.replaceAll('^', '**')
			setRes(eval(temp))
		} catch (error) {
			setRes('ERROR')
		}
	}, [equation])

	const onPress = ({ target }) => {
		let { action } = target.dataset
		if (action === 'C') return reset()
		if (!isPrevNumber() && !target.classList.contains('number')) return
		if (isPrevNumber() && target.classList.contains('number'))
			return changeLastInEquation(equation.at(-1) + '' + action)

		switch (action) {
			case '=':
				setEquation([res])
				return
			case '%':
				changeLastInEquation(+equation.at(-1) / 100)
				return
			case '+/-':
				let result = Number((equation.at(-1) + '').replace(/[()]/g, '')) * -1
				if (result < 0) result = '(' + result + ')'
				changeLastInEquation(result)
				return
			case '.':
				let temp = (equation.at(-1) + '').replace('.', '')
				changeLastInEquation(temp + action)
				return

			default:
				break
		}

		addToEquation(action)
	}

	const isPrevNumber = () => {
		return new RegExp(/[0-9]/).test(equation[equation.length - 1] + '')
	}

	const reset = () => {
		setEquation([])
		setRes(0)
	}

	const onDeleteLetter = () => {}

	const changeLastInEquation = newValue => {
		setEquation(prevEquation => {
			let temp = prevEquation.slice()
			temp.splice(temp.length - 1, 1, newValue)
			return temp
		})
	}

	const addToEquation = newAction => {
		setEquation(prevEquation => [...prevEquation, newAction])
	}

	// if (target.classList.contains('number') && equation.length && ) {
	// 	let temp = equation
	// 	temp[temp.length - 1] = equation[equation.length - 1] + target.dataset.action
	// 	setEquation(temp)
	// } else {
	// }

	//op2 - without eval:
	// const doAction = (num1, action, num2) => {
	// 	switch (action) {
	// 		case '+':
	// 			return +num1 + +num2
	// 		case '-':
	// 			return +num1 - +num2
	// 		case 'X':
	// 			return +num1 * +num2
	// 		case '/':
	// 			return +num1 / +num2
	// 		default:
	// 			return 0
	// 	}
	// }

	// const doMath = () => {
	// 	const priorityActions = ['X', '/']

	// 	for (let i = 0; i < priorityActions.length; i++) {
	// 		while (true) {
	// 			const idxAction = arr.indexOf(priorityActions[i])
	// 			if (idxAction !== -1) {
	// 				let temp = doAction(arr[idxAction - 1], priorityActions[i], arr[idxAction + 1])
	// 				arr.splice(idxAction - 1, 3, temp)
	// 			} else break
	// 		}
	// 	}

	// 	let resTemp = +arr[0]
	// 	for (let i = 1; i < arr.length; i += 2) {
	// 		resTemp = doAction(resTemp, arr[i], arr[i + 1])
	// 	}

	// 	setRes(resTemp)
	// }

	return (
		<section className='calculator'>
			<h1> I can help you with basic math! </h1>
			<h3> try me out :) </h3>

			<div className='math-solution'>
				<span className='res'> {res} </span>
				<span className='equation'> {equation.join('')} </span>
			</div>
			{createTable}
		</section>
	)
}

export default Calc
