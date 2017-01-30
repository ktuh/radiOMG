import { orion } from 'meteor/orionjs:core';

orion.dictionary.addDefinition('title', 'mainPage', {
    type: String,
    label: 'Site Title',
    optional: false,
    min: 1,
    max: 40
});

orion.dictionary.addDefinition('description', 'mainPage',
  orion.attribute('summernote', {
    label: 'Site Description',
    optional: true
  })
);

orion.dictionary.addDefinition('audioUrl', 'mainPage', {
    type: String,
    label: 'URL of the station\'s streaming audio feed',
    optional: true
});

