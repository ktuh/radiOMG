import { scorpius } from 'meteor/scorpiusjs:core';

scorpius.dictionary.addDefinition('title', 'mainPage', {
    type: String,
    label: 'Site Title',
    optional: false,
    min: 1,
    max: 40
});

scorpius.dictionary.addDefinition('description', 'mainPage',
  scorpius.attribute('summernote', {
    label: 'Site Description',
    optional: true
  })
);

scorpius.dictionary.addDefinition('audioUrl', 'mainPage', {
    type: String,
    label: 'URL of the station\'s streaming audio feed',
    optional: true
});

