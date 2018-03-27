import React, { Component } from "react";

class TasksShow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    const thisTag = this.props.tagList.filter(tag => {
      return parseInt(tag.id) === parseInt(id)
    })[0];
    this.setState({tag: thisTag});
  }

  render() {
    const { tag } = this.state;
    if (!tag){
      return(<h1>No tag selected...</h1>);
    } else {
      return (
        <div style={styles.container}>
          <h1>{tag.tag}</h1>
          <h3>Value: {tag.value}</h3>
          <p>Max: {tag.max}</p>
          <p>Min: {tag.min}</p>
          <p>Count: {tag.count}</p>
        </div>
      );
    }
  }
}

const styles = {
  container: {
    height: "100%",
    overflow: "scroll"
  },
  pointer: {
    cursor: "pointer"
  }
};

export default TasksShow;
