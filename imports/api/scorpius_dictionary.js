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

scorpius.dictionary.addDefinition('monthlyDJName', 'mainPage', {
  type: String,
  label: 'Name of DJ of the Month',
  optional: true
});

scorpius.dictionary.addDefinition('monthlyDJImgUrl', 'mainPage', {
  type: String,
  label: 'Image URL of DJ of the Month',
  optional: true
});

scorpius.dictionary.addDefinition('monthlyDJBlurb', 'mainPage', {
  type: String,
  autoform: {
    type: 'textarea',
    rows: 3
  },
  label: 'Blurb for DJ of the Month',
  optional: true
});

scorpius.dictionary.addDefinition('monthlyDJLink', 'mainPage', {
  type: String,
  label: 'Link for DJ of the Month (Article, Profile, Show Page, etc.)',
  optional: true
});
