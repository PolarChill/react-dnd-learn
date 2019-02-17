import React, {Component} from 'react';
import DragSourceKnight from './Knight';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { number, arrayOf } from 'prop-types';
import DropTargetBoardSquare from './BoardSquare';

class Board extends Component {
  static propTypes = {
    knightPosition: arrayOf(number).isRequired
  };

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    return (
      <div
        key={i}
        style={{
          width: '12.5%',
          height: '12.5%'
        }}>
        <DropTargetBoardSquare x={x} y={y}>
          {this.renderPiece(x, y)}
        </DropTargetBoardSquare>
      </div>
    );
  }

  renderPiece(x, y) {
    const [knightX, knightY] = this.props.knightPosition;

    if (knightX === x && knightY === y) {
      return <DragSourceKnight black />;
    }
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '640px',
          height: '640px'
        }}>
        {squares}
      </div>
    );
  }
}

const DragDropContextBoard = DragDropContext(HTML5Backend)(Board);
export default DragDropContextBoard;