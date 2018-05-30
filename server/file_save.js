import { Meteor } from 'meteor/meteor';
import https from 'https';
import yubigen from 'yubigen';
import { check } from 'meteor/check';

Meteor.methods({
  requestFrom: function (url, maxW) {
    check(url, String);
    check(maxW, Number);
    yubigen.s3Put({
      accessKeyId: Meteor.settings.awsKey,
      secretAccessKey: Meteor.settings.awsSecret
    }, Meteor.settings.bucket, 'thumbs/' + url.split('/').slice(-1)[0] + '.png',
    url, { resizeParams: [maxW], imageMagick: true, format: 'PNG' },
    (result, err) => {
      if (err) console.log(err);
    });
    return 'https://s3-' + Meteor.settings.awsRegion + '.amazonaws.com/' +
    Meteor.settings.bucket + '/thumbs/' + url.split('/').slice(-1)[0] + '.png'
  }
});
