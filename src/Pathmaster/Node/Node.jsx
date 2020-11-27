import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    return (
      <div
        id={`node-${this.props.row}-${this.props.col}`}
        className={`node ${this.props.nodeType} ${
          this.props.prevWall ? "prev-wall" : ""
        }`}
        onMouseDown={(e) =>
          this.props.onMouseDown(
            e.nativeEvent.which,
            this.props.row,
            this.props.col
          )
        }
        onMouseEnter={(e) =>
          this.props.onMouseEnter(
            e.nativeEvent.which,
            this.props.row,
            this.props.col
          )
        }
      ></div>
    );
  }
}
