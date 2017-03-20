import React, { Component } from 'react';
import DropNCrop from '../../src/DropNCrop';
import { action } from '@kadira/storybook';

class SetStateExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      filename: null,
      filetype: null,
      src: null,
      error: null,
    };
  }

  onChange = value => {
    action('onChange')(value); // Log to storybook's "action-logger"
    this.setState(value);
  };

  render() {
    return <DropNCrop onChange={this.onChange} value={this.state} />;
  }
}

export default SetStateExample;
