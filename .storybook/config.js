import { configure } from '@kadira/storybook';

function loadStories() {
  require('../demo/stories');
}

configure(loadStories, module);
