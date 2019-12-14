import React, { Component } from 'react'

class TickForm extends Component {
	constructor(props) {
		super(props);
		this.state = { inputValue: ' ' } //sets initial value of state
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	//instantaneously handles the changing text in the input form
	handleChange(e) {
		this.setState({
			inputValue: e.target.value
		});
	}
	//handle tickform submit
	handleSubmit() {
		this.props.addTick(this.state.inputValue)
		// this.setState({ inputValue: " " })
	}

	render() {
		return (
			<div>
				<input
					type="text" //these are props passed ot the input
					value={this.state.inputValue}
					onChange={this.handleChange}
				/>
				<button
					onClick={this.handleSubmit}
				>Add Tick</button>
			</div>
		)
	}
}

export default TickForm
