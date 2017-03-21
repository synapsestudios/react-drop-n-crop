import React, { Component } from 'react';
import DropNCrop from '../../src/DropNCrop';
import { action } from '@kadira/storybook';

class SetStateExample extends Component {
  state = {
    result: null,
    filename: null,
    filetype: null,
    src: null,
    error: null,
  };

  onChange = value => {
    action('onChange')(value); // Log to storybook's "action-logger"
    this.setState(value);
  };

  render() {
    return (
      <div>
        <h1>@synapsestudios/react-drop-n-crop</h1>
        <DropNCrop onChange={this.onChange} value={this.state} />
        <h3>Example Usage:</h3>
        <pre>
          {
            `import React, { Component } from 'react';
import DropNCrop from '@synapsestudios/react-drop-n-crop';

import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';

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
    );
  }
}

export default SetStateExample;
