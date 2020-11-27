import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      col,
      row,
      isStart,
      isFinish,
      isColor,
      isWall,
      onMouseDown,
      onMouseEnter,
    } = this.props;

    const nodeType = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : isColor
      ? "node-color"
      : "node-default";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${nodeType}`}
        onMouseDown={(e) => onMouseDown(e.nativeEvent.which, row, col)}
        onMouseEnter={(e) => onMouseEnter(e.nativeEvent.which, row, col)}
      ></div>
    );
  }
}
