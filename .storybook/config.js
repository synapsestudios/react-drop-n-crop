import { configure } from '@kadira/storybook';

function loadStories() {
  require('../storybook/stories');
}

configure(loadStories, module);
