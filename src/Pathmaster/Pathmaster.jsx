import React, { Component } from "react";
import Node from "./Node/Node";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Grid from "./Grid";
import { runAlgorithm, getNodesInOrder } from "../Algorithms/RunAlgorithm.js";
import {
  NUM_ROWS,
  NUM_COLS,
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
} from "./Constants.js";

import "./Pathmaster.css";

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      pieceType: "King",
      algorithm: "Dijkstra",
      running: false,
    };
  }

  componentDidMount() {
    this.resetWalls();
  }

  resetBoard = () => {
    this.resetWalls();
    this.clearPath();
  };

  resetWalls() {
    const newGrid = getInitialGrid();
    this.setState({ grid: newGrid });
  }

  clearPath() {
    var nodes = document.getElementsByClassName("node");
    for (let node of nodes) {
      node.classList.remove("node-visited", "node-shortest-path");
    }
  }

  setPieceType = (piece) => {
    this.setState({ pieceType: piece });
  };

  setAlgorithm = (algo) => {
    this.setState({ algorithm: algo });
  };

  handleMouseDown = (e, row, col) => {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }

    if (!this.state.running) {
      if (row === undefined && col === undefined) {
        this.setState({ mouseIsPressed: true });
      } else {
        const newGrid = getNewGrid(this.state.grid, row, col, e);
        this.setState({ grid: newGrid, mouseIsPressed: true });
      }
    }
  };

  handleMouseEnter = (e, row, col) => {
    if (!this.state.running && this.state.mouseIsPressed) {
      const newGrid = getNewGrid(this.state.grid, row, col, e);
      this.setState({ grid: newGrid });
    }
  };

  handleMouseUp = () => {
    this.setState({ mouseIsPressed: false });
  };

  animate(visitedNodesInOrder, nodesInShortestPathOrder, startNode) {
    const newGrid = resetGridWithWalls(this.state.grid);
    this.setState({ grid: newGrid });
    this.clearPath();
    
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className +=
          " node-visited";
      }, 10 * i);
    }

    if (nodesInShortestPathOrder[0] === startNode) {
      setTimeout(() => {
        this.animateShortestPath(nodesInShortestPathOrder);
      }, 10 * visitedNodesInOrder.length);
    } else {
      //display error, shortest path not found
    }
  }

  animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className +=
          " node-shortest-path";
      }, 50 * i);
    }
  };

  visualize = async () => {
    const { grid, pieceType, algorithm } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = runAlgorithm(
      algorithm,
      grid,
      startNode,
      finishNode,
      pieceType
    );
    const nodesInShortestPathOrder = getNodesInOrder(
      finishNode,
      pieceType,
      true,
      grid
    );

    this.animate(visitedNodesInOrder, nodesInShortestPathOrder, startNode);
    this.setState({ running: false });
  };

  render() {
    var { grid, pieceType, algorithm } = this.state;

    return (
      <>
        <div className="body">
          <Header
            algorithm={algorithm}
            currentPiece={pieceType}
            handleMouseUp={this.handleMouseUp}
            setPieceType={this.setPieceType}
            resetBoard={this.resetBoard}
            setAlgorithm={this.setAlgorithm}
            visualize={this.visualize}
          />
          <Grid
            grid={grid}
            handleMouseUp={this.handleMouseUp}
            handleMouseDown={this.handleMouseDown}
            handleMouseEnter={this.handleMouseEnter}
          />
          <Footer handleMouseUp={this.handleMouseUp} />
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_COLS; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const resetGridWithWalls = (grid) => {
  const newGrid = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    const newRow = [];
    for (let col = 0; col < NUM_COLS; col++) {
      let newNode = createNode(col, row);
      if (grid[row][col].isWall) newNode.isWall = true;
      newRow.push(newNode);
    }
    newGrid.push(newRow);
  }

  return newGrid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    distance: Infinity,
    heuristic: Math.sqrt(
      Math.pow(col - FINISH_NODE_COL, 2) + Math.pow(row - FINISH_NODE_ROW, 2)
    ),
    isVisited: false,
    isChanged: false,
    previousNode: null,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isColor: row % 2 === col % 2,
    isWall: false,
  };
};

const getNewGrid = (grid, row, col, mouse) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
  };

  if (mouse === 1) {
    if (!newNode.isStart && !newNode.isFinish) {
      if (!newNode.isWall) {
        newNode.isWall = true;
        newNode.prevWall = false;
      }
    }
  } else if (mouse === 3) {
    if (!newNode.isStart && !newNode.isFinish) {
      if (newNode.isWall) {
        newNode.prevWall = true;
        newNode.isWall = false;
      }
    }
  }

  newGrid[row][col] = newNode;
  return newGrid;
};
