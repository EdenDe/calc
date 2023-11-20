import React from 'react'
import './Header.scss'
import Menu from '../Menu/Menu'

const Header = () => {
	return (
		<section className='header'>
			<div className='container flex space-between'>
				<div className='logo'> LOGO </div>
				<Menu />
			</div>
		</section>
	)
}
export default Header
