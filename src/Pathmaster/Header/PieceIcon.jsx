import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import king from "../Pieces/king.png";
import queen from "../Pieces/queen.png";
import bishop from "../Pieces/bishop.png";
import rook from "../Pieces/rook.png";
import knight from "../Pieces/knight.png";
import pawn from "../Pieces/pawn.png";

export default class PieceIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      piece: this.props.piece,
    };
  }

  componentDidMount() {
    if (this.state.piece === this.props.currentPiece) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentPiece !== prevProps.currentPiece) {
      if (this.state.piece === this.props.currentPiece) {
        this.setState({ active: true });
      } else {
        this.setState({ active: false });
      }
    }
  }

  onClick(piece) {
    this.props.setPieceType(piece);
  }

  render() {
    const { piece } = this.state;
    const image = {
      King: king,
      Queen: queen,
      Bishop: bishop,
      Rook: rook,
      Knight: knight,
      Pawn: pawn,
    }[piece];

    if (piece === "Pawn") {
      return (
        <Button
          className={
            this.state.active
              ? "piece_selected"
              : "piece_unselected easter_hide"
          }
          onClick={() => this.onClick(piece)}
        >
          <img src={image} width="35" alt={piece}></img>
        </Button>
      );
    } else {
      return (
        <Button
          className={this.state.active ? "piece_selected" : "piece_unselected"}
          onClick={() => this.onClick(piece)}
        >
          <img src={image} width="35" alt={piece}></img>
        </Button>
      );
    }
  }
}
