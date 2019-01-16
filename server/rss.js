import { RssFeed } from 'meteor/raix:rssfeed';

RssFeed.publish('podcast', function() {
  var self = this;

  var params = {
    title: self.cdata('KTUH Podcast'),
    description: self.cdata('This is the KTUH Podcast.'),
    link: 'https://ktuh.org',
    lastBuildDate: new Date(),
    ttl: 1,
    language: 'en-US'
  };

  for (var p in params) {
    self.setValue(p, params[p]);
  }

  self.addItem({
    title: 'KTUH Podcast Episode 0',
    description: 'This is a test.',
    link: 'https://ktuh.org',
    pubDate: new Date()
  });
});
