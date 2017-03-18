import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import DropNCrop from '../../src/DropNCrop';
import '../../styles/index.css';

storiesOf('<DropNCrop />', module).add('Default', () => (
  <div>
    <h1>React Drop-n-Crop</h1>
    <DropNCrop
      onSave={fileBlob => {
        action('fileBlob')(fileBlob);
      }}
    />
    <h3>Example Usage:</h3>
    <pre>
      {
        `<DropNCrop
  onSave={(fileBlob) => {
    console.log(fileBlob);
  }}
/>`
      }
    </pre>
  </div>
));
