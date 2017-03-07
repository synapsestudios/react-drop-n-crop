import React from 'react';
import { storiesOf } from '@kadira/storybook';

import DropNCrop from '../../src/DropNCrop';
import '../../src/index.css';

storiesOf('DropNCrop', module)
  .add('default', () => (
    <div>
      <h1>React Drop-n-Crop</h1>
      <DropNCrop
        onSave={(file) => {
          console.log(file);
        }}
      />
      <h4>Default Settings:</h4>
      <pre>
        {
`<DropNCrop
  onSave={(file) => {
    console.log(file);
  }}
/>`
        }
      </pre>
    </div>
  ));
