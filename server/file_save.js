import { Meteor } from 'meteor/meteor';
import https from 'https';
import yubigen from 'yubigen';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: Meteor.settings.awsKey,
  secretAccessKey: Meteor.settings.awsSecret
});

Meteor.methods({
  requestFrom: function (url, maxW) {
    yubigen.fromUrl(url, { resizeParams: [maxW], imageMagick: true, format: "PNG" },
    (result, err) => {
      if (err) console.log(err);
      if (result) {
        var params = {
          Bucket: Meteor.settings.bucket,
          Key: "thumbs/" + url.split("/").slice(-1)[0] + ".png",
          Body: result
        };
        var s3 = new AWS.S3();
        s3.putObject(params, function(error) {
          if (error) console.log(error);
        });
      }
    });
    return "https://s3-" + Meteor.settings.awsRegion + ".amazonaws.com/" + Meteor.settings.bucket + "/thumbs/" + url.split("/").slice(-1)[0] + ".png"
  }
});
