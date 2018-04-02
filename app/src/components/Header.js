import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
	render(){
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to="/settings"
						className="brand-logo right"
						style={{ cursor: "pointer" }}
					>
						<i className="material-icons">settings</i>
					</Link>
					<ul>
						<li>
							<Link to="/">All Tags</Link>
						</li>
						{/* <li>
				<Link to="/tasks">All Tasks</Link>
			</li> */}
					</ul>
				</div>
			</nav>
		);
	}
}
