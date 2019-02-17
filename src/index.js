import React from 'react';
import ReactDOM from 'react-dom';
import DragDropContextBoard from './components/Board';
import { observe } from './components/Game';


const board = document.getElementById('board');
observe(knightPosition => {
  ReactDOM.render(<DragDropContextBoard knightPosition={knightPosition} />, board);
});
