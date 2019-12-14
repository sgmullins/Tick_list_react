import React from 'react'

const TickItem = ({ name, completed, onDelete, onToggle }) => (
	<li>
		<span
			style={{
				textDecoration: completed ? 'line-through' : 'none'
			}}
			onClick={onToggle}
		>
			{name}
		</span>
		<span onClick={onDelete}> X </span>
	</li>
)

export default TickItem;

