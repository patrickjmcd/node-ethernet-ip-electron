import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ipcRenderer } from "electron";
import { _ } from 'lodash';

import Header from "./Header";
import TagsIndex from "./TagsIndex";
import TagsShow from "./TagsShow";
import Settings from "./Settings";

const APP_DATA = JSON.parse(localStorage.getItem("__INITIAL_STATE__"));

const INITIAL_STATE = {
  tags: [
    { id: 1, tag: "val_IntakeTemperature", value: null, max: null, min: null, average: null, count: 0 },
    { id: 2, tag: "val_IntakePressure", value: null, max: null, min: null, average: null, count: 0 }
  ],
  ipAddress: "10.20.4.36"
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = APP_DATA || INITIAL_STATE;

  }

  handleSettingsUpdate(newSettings){
    this.setState({ ...newSettings });
    ipcRenderer.send('tag:added', this.state);
  }

  handleDataReset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  sendTags = () => {
    ipcRenderer.send('tag:added', this.state);
  };

  componentDidMount = () => {
    this.sendTags();
    ipcRenderer.on('tag:valueupdate', (event, got) => {
      const { tagList } = this.state;
      _.forEach(tagList, (tag, key) => {
        if (tag.tag === got.state.tag.name){
          tag.value = got.state.tag.value;
          tagList[key] = tag;

        }
      })
      this.setState({tagList});
    })
  }


  render() {
    const { tags, ipAddress } = this.state;
    return (
      <div>
        <Header />
        <div className="container" style={styles.container}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <TagsIndex
                  tagList={tags}
                  ipAddress={ipAddress}
                />
              )}
            />
            <Route
              path="/tags/:id"
              render={props => (
                <TagsShow tagList={tags} {...props} />
              )}
            />
            <Route
              path="/settings"
              render={() => (
                <Settings
                  ipAddress={ipAddress}
                  tagList={tags}
                  handleSubmit={this.handleSettingsUpdate}
                  handleDataReset={this.handleDataReset}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    height: "88vh"
  }
};

export default App;
