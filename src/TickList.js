import React, { Component } from 'react';
import TickItem from './TickItem';
import TickForm from './TickForm';
import * as apiCalls from './api'

class TickList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ticks: []
		}
		this.addTick = this.addTick.bind(this);
	}

	componentWillMount() {
		this.loadTicks();
	}
	//async function that calls inside of apicalls and getticks runs, then setState when it returns
	async loadTicks() {
		let ticks = await apiCalls.getTicks();
		this.setState({ ticks });
	}

	async addTick(val) {
		let newTick = await apiCalls.createTick(val)
		this.setState({ ticks: [...this.state.ticks, newTick] })
	};

	//API file made to handle all of our api calls and error handling before being imported to this file
	//Delete request to our API
	async deleteTick(id) {
		await apiCalls.removeTick(id);
		//filtering out the id sent to delete and setting tick to the new array
		const ticks = this.state.ticks.filter(tick => tick._id !== id)
		//then setting state of ticks array to the new array just created
		this.setState({ ticks: ticks });
	}

	async toggleTick(tick) {
		let updatedTick = await apiCalls.updateTick(tick)
		//mapping over tick, if tick id = update id then check to see the state of completed and change to opposite
		const ticks = this.state.ticks.map(t =>
			(t._id === updatedTick._id) ? { ...t, completed: !t.completed } : t)
		//then setting state of ticks array to the new array just created
		this.setState({ ticks: ticks });
	};


	render() {
		const ticks = this.state.ticks.map((t) => (
			<TickItem
				key={t._id}
				{...t}
				onDelete={this.deleteTick.bind(this, t._id)}//must bind and define this prop down here because the delete needs access to the id passed from key
				//passing the entire tick to the toggle since we need to see if it is completed or not
				onToggle={this.toggleTick.bind(this, t)}
			/>
		));
		return (
			<div>
				<h1>Tick List!</h1>
				<TickForm addTick={this.addTick} />
				<ul>
					{ticks}
				</ul>
			</div>


		)
	}
}
export default TickList;
