import React from 'react';
import { storiesOf } from '@kadira/storybook';

import SetStateExample from './SetStateExample';
import '../../styles/index.css';

storiesOf('<DropNCrop />', module).add('setState Example (default)', () => (
  <div>
    <style>
      {
        `
        html {
          box-sizing: border-box;
        }
        *, *:before, *:after {
          box-sizing: inherit;
        }
        body {
          font-family: -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif;
        }
      `
      }
    </style>
    <SetStateExample />
  </div>
));
