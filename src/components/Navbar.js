import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

class Navbar extends Component {
	logoutHandler = () => {
		const { dispatch } = this.props;
		dispatch(setAuthedUser(null));
	};
	render() {
		const { authedUser, users } = this.props;
		return (
			<div className="ui pointing secondary menu" style={{ width: "90%", margin: "20px auto" }}>
				<NavLink to="/" className="item" exact style={{ color: "white"; fontSize: "8px" }}>
					Home
				</NavLink>

				<NavLink to="/add" className="item" exact style={{ color: "white"; fontSize: "8px" }}>
					New Question
				</NavLink>

				<NavLink to="/leaderboard" className="item" exact style={{ color: "white"; fontSize: "8px" }}>
					Leaderboard
				</NavLink>

				<div className="right menu" >
					<span className="item" style={{ color: "white"; fontSize: "8px" }}>
						<img className="ui avatar image" src={users[authedUser].avatarURL} alt="" />
						Hi {authedUser}
					</span>
					<button className="ui red button" onClick={this.logoutHandler} style={{backgroundColor: "#c94c4c"}}>
						Logout
					</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ authedUser, users }) {
	return {
		authedUser,
		users,
	};
}

export default connect(mapStateToProps)(Navbar);
