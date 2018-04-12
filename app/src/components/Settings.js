import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { setPlcIpAddress, storeNewTag, ipcPlcInitializeSend, deleteTag } from "../actions";

export class Settings extends Component {
	constructor(props){
		super(props);

		this.state = {
			ipAddress: "",
			newTag: ""
		};
	}

	getTagList = () => {
		const { tags } = this.props;

		let tableMiddle = _.map(tags, (tag) => {
			return (<tr key={tag.name}>
				<td>{tag.name}</td>
				<td>
					<button
						className="btn red delete-button"
						onClick={(e) => this.onDeleteClick(e, tag.name)}
					><i className="material-icons">clear</i></button></td>
			</tr>);
		});

		return (
			<table>
				<thead>
					<tr>
						<th>Tag</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{tableMiddle}
				</tbody>
			</table>
		);
	}

	componentWillMount(){
		if (this.props.plc && this.props.plc.ipAddress){
			this.setState({ipAddress: this.props.plc.ipAddress});
		}
	}

	onDeleteClick = (e, tagName) =>{
		e.preventDefault();
		this.props.deleteTag(tagName);
	}

	onIpAddressInputChange = (event) => {
		this.setState({ipAddress: event.target.value});
	}

	sendIpAddress = (e) => {
		e.preventDefault();
		this.props.setPlcIpAddress(this.state.ipAddress);
	}

	onNewTagChange = (e) => {
		this.setState({newTag: e.target.value});
	}

	onNewTagSubmit = (e) => {
		e.preventDefault();
		this.props.storeNewTag(this.state.newTag);
		this.setState({newTag: ""});
	}

	onSave = (e) => {
		e.preventDefault();
		this.props.ipcPlcInitializeSend(this.props.plc.ipAddress, this.props.tags);
		this.props.history.push("/");
	}

	render() {
		const ipAddressBtnClass = ((this.state.ipAddress === this.props.plc.ipAddress) || (this.state.ipAddress.length === 0)) ? "btn disabled right" : "btn right";
		const initializeBtnClass = (this.props.plc.ipAddress && _.map(this.props.tags, (t)=>t).length > 0) ? "btn" : "btn disabled";

		return (
			<div style={styles.container} className="settings">
				<ul className="collection with-header">
					<li className="collection-header">
            Settings
					</li>
					<form>
						<li className="collection-item">
							<p>IP Address</p>
							<input
								className="ip-address-field"
								value={this.state.ipAddress}
								placeholder="PLC IP Address"
								onChange={this.onIpAddressInputChange}
							/>
							<button
								className={ipAddressBtnClass + " ip-submit-button"}
								onClick={(e) => this.sendIpAddress(e)}>
                Set IP Address
							</button>
						</li>
					</form>

					<form>
						<li className="collection-item tag-list">
							<h4>Tag List</h4>
							{this.getTagList()}
							<input
								className="tag-name-input"
								value={this.state.newTag}
								onChange={this.onNewTagChange}
								placeholder="New Tag Name..."
							/>
							<button
								className="btn add-tag-button"
								onClick={(e) => this.onNewTagSubmit(e)}
							>Add Tag</button>
						</li>
						<li className="collection-item right">
							<button
								className={initializeBtnClass + " save-button"}
								onClick={(e) => this.onSave(e)}
							>Save</button>
						</li>
					</form>
				</ul>
			</div>
		);
	}
}

const styles = {
	container: {
		display: "flex",
		flexDirection: "column"
	},
	pointer: {
		cursor: "pointer"
	}
};

function mapStateToProps(state){
	return{
		tags: state.tags,
		plc: state.plc
	};
}

export default connect(mapStateToProps, { setPlcIpAddress, storeNewTag, ipcPlcInitializeSend, deleteTag })(Settings);
