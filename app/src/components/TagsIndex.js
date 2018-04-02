import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import Gauge from "react-svg-gauge";

import { writeTag } from "../actions";


class TagsIndex extends Component {

	constructor(props){
		super(props);
		this.state = {writes: {}};
	}

	renderTagsList(){
		return _.map(this.props.tags, (t) => {
			return (<tr key={t.name}>
				<td>{t.name}</td>
				<td>{Math.round(t.value * 100) / 100}</td>
				<td><input 
					onChange={(e) => this.onTagWriteFieldChanged(e, t.name)}
				/></td>
				<td><button 
					className="waves-effect waves-light btn"
					onClick={() => this.onWriteButtonClick(t.name)}
				>Write</button></td>
			</tr>);
		});
	}

	renderTagsGauges(){
		return _.map(this.props.tags, (tag) => {
			return (<div className="col s4" key={tag.name}>
				<Gauge value={Math.round(tag.value * 100) / 100}
					width={200}
					height={150}
					label={tag.name}
					valueLabelStyle={styles.valueLabel}
					topLabelStyle={styles.topLabel}
					minMaxLabelStyle={styles.minMaxLabel} />
			</div>);
		});
	}

	onWriteButtonClick = (tagName) => {
		console.log(tagName, this.state.writes[tagName]);
		this.props.writeTag(tagName, this.state.writes[tagName]);
	}

	onTagWriteFieldChanged = (e, tagName) => {
		console.log(tagName, e.target.value);
		this.setState({writes: {...this.state.writes, [tagName]: e.target.value}});
	}

	render() {
		let PLC = "PLC";
		if (this.props.plc.details){
			PLC = this.props.plc.details.name;
		}

		if (!this.props.tags || _.map(this.props.tags, (t)=> t ).length === 0) {
			return (
				<div style={styles.container}>
					<h3>
            No Tags.
					</h3>
					<h4>Add some in <Link to="/settings">Settings</Link>.</h4>
				</div>
			);
		}

		return (
			<div style={styles.container}>
				<h2>Tags for {this.props.plc.ipAddress}</h2>
				<h3>{PLC}</h3>
				<div className="row">
					{this.renderTagsGauges()}
				</div>

				<table>
					<thead>
						<tr>
							<th>Tag Name</th>
							<th>Value</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{ this.renderTagsList()}
					</tbody>
				</table>
			</div>
		);
	}
}

const styles = {
	container: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		textAlign: "center"
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "column"
	},
	button: {
		marginBottom: "15px"
	},
	valueLabel: {
		fontSize: "1.5em"
	},
	topLabel: {
		fontSize: "1.35em"
	},
	minMaxLabel: {
		fontSize: "0.85em"
	}
};

function mapStateToProps(state){
	return {
		tags: state.tags,
		plc: state.plc
	};
}

export default connect(mapStateToProps, { writeTag })(TagsIndex);
