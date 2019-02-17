import React, { Component } from 'react';
import {ItemTypes}  from './Constants';
import { DragSource } from 'react-dnd';
import { func, bool } from 'prop-types';

const knightSource = {
  beginDrag(props) {
    return {};
  }
};
const knightCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

class Knight extends Component {
  static propTypes = {
    connectDragSource: func.isRequired,
    isDragging: bool.isRequired,
    black: bool
  };

  render() {
    const { connectDragSource, isDragging, black } = this.props;
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'gold' : 'silver';

    return connectDragSource(
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          position: 'relative',
          width: '100%',
          height: '100%',
          fontSize: 50,
          cursor: 'move'
        }}>
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: fill
          }}>
          ♞
        </span>
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: stroke
          }}>
          ♘
        </span>
      </div>
    );
  }
}

const DragSourceKnight = DragSource(ItemTypes.KNIGHT, knightSource, knightCollect)(Knight);
export default DragSourceKnight;
// export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
