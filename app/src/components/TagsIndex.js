import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import _ from 'lodash';
import Gauge from 'react-svg-gauge';

import { ipcTagSync } from '../actions';

class TagsIndex extends Component {

  renderTagsList(){
    return _.map(this.props.tags, (t) => {
      return (<tr key={t.name}>
        <td>{t.name}</td>
        <td>{Math.round(t.value * 100) / 100}</td>
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
      </div>)
    })
  }

  render() {
    let PLC = "PLC";
    if (this.props.plc.details){
      PLC = this.props.plc.details.name;
    }

    if (!this.props.tags || _.map(this.props.tags, (t)=> t ).length === 0) {
      return (
        <div style={styles.container}>
          {/* <button
            className="btn teal lighten-2"
            onClick={this.props.ipcTagSync}
            >
          Sync Tags
          </button> */}
          <h3>
            No Tags.
          </h3>
          <h4>Add some in <Link to="/settings">Settings</Link>.</h4>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        {/* <button
          className="btn teal lighten-2"
          onClick={()=> this.props.ipcTagSync(this.props.tags)}
          >
        Sync Tags
        </button> */}
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
   }
}

export default connect(mapStateToProps, { ipcTagSync })(TagsIndex);
