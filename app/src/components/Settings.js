import React, { Component } from "react";
import _ from 'lodash';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ipAddress: this.props.ipAddress,
      tagList: this.props.tagList,
      newTag: ''
    };
    this.getTagList = this.getTagList.bind(this);
    this.addNewTag =this.addNewTag.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
  };

  buttonStyle = () => {
    const { ipAddress, tagList } = this.state;
    const propsIPAddress = this.props.ipAddress;
    const propsTagList = this.props.tagList;

    if (ipAddress == propsIPAddress && tagList == propsTagList) {
      // double equals to avoid type check
      return "btn";// disabled";
    }

    return "btn";
  };

  getTagList = () => {
    const { tagList } = this.state;


    let tableMiddle = _.map(tagList, (tag) => {
        return (<tr key={tag.id}>
          <td>{tag.tag}</td>
          <td><button className="btn red"><i className="material-icons" onClick={e => this.removeTag(e, tag.id)}>clear</i></button></td>
        </tr>)
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
      )
  }

  removeTag = (e, id) => {
    const { tagList } = this.state;
    const oldTag = _.remove(tagList, (tag) => {
      return parseInt(tag.id) === parseInt(id)
    })

  }

  addNewTag = (e) => {
    e.preventDefault();
    let { tagList } = this.state;
    const maxId = Math.max.apply(null, tagList.map( (t) => {
      return t.id
    }));

    tagList.push({
      id: parseInt(maxId) + 1,
      tag: this.state.newTag,
      value: null
    })
    this.setState({ tagList, newTag: ''});
  }

  render() {
    return (
      <div style={styles.container}>
        <ul className="collection with-header">
          <li className="collection-header">
            Settings
          </li>
          <form onSubmit={this.onSubmit}>
            <li className="collection-item">
              <p>IP Address</p>
              <input
                value={this.state.ipAddress}
                onChange={e => this.setState({ ipAddress: e.target.value })}
              />
            </li>
            <li className="collection-item">
              <p>Tag List</p>
              {this.getTagList()}
              <input
                value={this.state.newTag}
                onChange={e => this.setState({ newTag: e.target.value })}
              />
              <button
                onClick={e => this.addNewTag(e)}
                className="btn"
                >Add Tag</button>
            </li>
            <li className="collection-item right">
              <button type="submit" className={this.buttonStyle()}>Save</button>
            </li>
          </form>
        </ul>
        <button className="btn red" onClick={this.props.handleDataReset}>
          Reset Data
        </button>
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

export default Settings;
