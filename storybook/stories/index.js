import React from 'react';
import { storiesOf } from '@kadira/storybook';

import SetStateExample from './SetStateExample';
import '../../styles/index.css';

storiesOf('<DropNCrop />', module).add('setState Example', () => (
  <div>
    <h1>react-drop-n-crop</h1>
    <SetStateExample />
    <h3>Example Usage:</h3>
    <pre>
      {
        `import React, { Component } from 'react';
import DropNCrop from '@synapsestudios/react-drop-n-crop';

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

  onChange = value => this.setState(value);

  render() {
    return <DropNCrop onChange={this.onChange} value={this.state} />;
  }
}

export default SetStateExample;
`
      }
    </pre>
  </div>
));
