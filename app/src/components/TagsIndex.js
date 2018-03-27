import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ipcRenderer } from 'electron';
import _ from 'lodash';
import Gauge from 'react-svg-gauge';

class TagsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ipAddress: this.props.ipAddress,
      tagList: this.props.tagList
    };
    this.updateValues = this.updateValues.bind(this);
  }

  updateValues = (event, data) => {
    const { tagList } = this.state;
    _.forEach(tagList, (tag, key) => {
      if (tag.tag === data.state.tag.name){
        tag.value = data.state.tag.value;
        tag.average = tag.count > 0 ? tag.average * ((tag.count - 1) / tag.count) + tag.value / tag.count : tag.value;
        tag.count++;
        tag.max = _.max([tag.value, tag.max]);
        tag.min = _.min([tag.value, tag.min]);
        tagList[key] = tag;
      }
    })
    this.setState({tagList});
  }

  componentDidMount (){
    ipcRenderer.on('tag:valueupdate', this.updateValues)
  }

  componentWillUnmount() {
   ipcRenderer.removeListener('tag:valueupdate', this.updateValues)
 }


  render() {
    const { ipAddress, tagList } = this.state;

    if (tagList.length === 0) {
      return (
        <div style={styles.container}>
          <h3>
            No Tags.
          </h3>
          <h4>Add some in <Link to="/settings">Settings</Link>.</h4>
        </div>
      );
    }

    const tagTableInner = _.map(tagList, (t) => {
      return (<tr key={t.id}>
        <td><Link to={"/tags/" + t.id}>{t.tag}</Link></td>
        <td>{Math.round(t.value * 100) / 100}</td>
      </tr>);
    });

    return (
      <div style={styles.container}>
        <h2>Tags for {ipAddress}</h2>
        <div className="row">
            {
              _.map(tagList, (tag) => {
                return (<div className="col s4" key={tag.id}>
                  <Gauge value={Math.round(tag.value * 100) / 100}
                    width={200}
                    height={150}
                    label={tag.tag}
                    valueLabelStyle={styles.valueLabel}
                    topLabelStyle={styles.topLabel}
                    minMaxLabelStyle={styles.minMaxLabel} />
                </div>)
              })
            }
        </div>

        <table>
          <thead>
            <tr>
              <th>Tag Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
          { tagTableInner }
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

export default TagsIndex;
