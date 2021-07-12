import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
	state = {
		optionOne: "",
		optionTwo: "",
		home: false,
	};

	changeHandler = (e, option) => {
		const input = e.target.value;

		this.setState(() => ({
			[option]: input,
		}));
	};

	submitHandler = (e) => {
		e.preventDefault();
		const { optionOne, optionTwo } = this.state;
		const { dispatch } = this.props;

		dispatch(handleAddQuestion(optionOne, optionTwo));

		this.setState(() => ({
			optionOne,
			optionTwo,
			home: true,
		}));
	};

	render() {
		const { optionOne, optionTwo, home } = this.state;

		if (home) {
			return <Redirect to="/" />;
		}

		return (
			<div className="new-question-form">
				<h2>New Question</h2>
				<h5>WOULD YOU RATHER...</h5>
				<form className="ui form" onSubmit={this.submitHandler}>
					<div className="field">
						<label style={{color: "#8d9db6"}}>FIRST OPTION</label>
						<input
							type="text"
							placeholder="Enter your first option here"
							onChange={(e) => this.changeHandler(e, "optionOne")}
							defaultValue={optionOne}
						/>
					</div>
					<div className="field">
						<label style={{color: "#8d9db6"}}>SECOND OPTION</label>
						<input
							type="text"
							placeholder="Enter your second option here"
							onChange={(e) => this.changeHandler(e, "optionTwo")}
							defaultValue={optionTwo}
						/>
					</div>
					<button style={{backgroundColor: "#87bdd8"}}type="submit" className="ui blue button">
						CREATE
					</button>
				</form>
			</div>
		);
	}
}

export default connect()(NewQuestion);
