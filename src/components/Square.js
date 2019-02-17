import React, {Component} from 'react';
import { bool } from 'prop-types';


export default class Square extends Component {
  static propTypes = {
    black: bool
  };

  render() {
    const { black, children } = this.props;
    const background = black ? 'black' : 'white';
    const color = black ? 'white' : 'black';

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background,
          color
        }}>
        {children}
      </div>
    );
  }
}
