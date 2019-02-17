import React, {Component} from 'react';
import Square from './Square';
import { moveKnight, canMoveKnight } from './Game';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';
import { func, bool, number } from 'prop-types';


const squareTarget = {
  canDrop(props) {
    return canMoveKnight(props.x, props.y);
  },
  drop(props, monitor) {
    moveKnight(props.x, props.y);
  }
};

const squareCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
};
class BoardSquare extends Component {
  static propTypes = {
    connectDropTarget: func.isRequired,
    isOver: bool.isRequired,
    x: number.isRequired,
    y: number.isRequired
  };

  renderOverlay(color) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: color
        }}
      />
    );
  }

  render() {
    const { connectDropTarget, isOver, canDrop, x, y, children } = this.props;
    const black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
        <Square black={black}>{children}</Square>
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}

const DropTargetBoardSquare = DropTarget(ItemTypes.KNIGHT, squareTarget, squareCollect)(BoardSquare);
export default DropTargetBoardSquare;
