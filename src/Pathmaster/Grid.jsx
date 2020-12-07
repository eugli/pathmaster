import React, { Component } from "react";
import Node from "./Node/Node";

export default class Grid extends Component {
  render() {
    return (
      <div
        className="grid"
        onMouseUp={() => this.props.handleMouseUp()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {this.props.grid.map((row, rowId) => {
          return (
            <div className="row" key={rowId}>
              {row.map((node, nodeId) => {
                const {
                  col,
                  row,
                  isFinish,
                  isStart,
                  isColor,
                  isWall,
                  prevWall,
                } = node;

                return (
                  <Node
                    key={nodeId}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    isColor={isColor}
                    prevWall={prevWall}
                    onMouseDown={(e) => this.props.handleMouseDown(e, row, col)}
                    onMouseEnter={(e) =>
                      this.props.handleMouseEnter(e, row, col)
                    }
                    nodeType={getNodeType(node)}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const getNodeType = (node) => {
  return node.isFinish
    ? "node-finish"
    : node.isStart
    ? "node-start"
    : node.isWall
    ? "node-wall"
    : node.isColor
    ? "node-color"
    : "node-default";
};
