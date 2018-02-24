import { Meteor } from 'meteor/meteor';
import https from 'https';
import gm from 'gm';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: Meteor.settings.awsKey,
  secretAccessKey: Meteor.settings.awsSecret
});

Meteor.methods({
  requestFrom: function (url, maxW) {
    var imgBuf = new Buffer('');
    https.get(url, (respon) => {
      respon.on('data', (data) => {
        imgBuf = Buffer.concat([imgBuf, data]);
      });
      respon.on('end', () => {
        var imageMagick = gm.subClass({ imageMagick: true });
        return imageMagick(imgBuf).resize(maxW).toBuffer('PNG', (error, buff) => {
          var params = {
            Bucket: Meteor.settings.bucket,
            Key: "thumbs/" + url.split("/").slice(-1)[0] + ".png",
            Body: buff
          };
          var s3 = new AWS.S3();
          return s3.putObject(params, function(err){
            if (!err) return "https://s3-" + Meteor.settings.awsRegion + ".amazon.com/" + Meteor.settings.bucket + "/" + "thumbs/" + url.split("/").slice(-1)[0] + ".png";
          });
        });
      });
    }).on('error', (err) => {
      if (err) return;
    });
    return "https://s3-" + Meteor.settings.awsRegion + ".amazonaws.com/" +
      Meteor.settings.bucket + "/thumbs/" + url.split("/").slice(-1)[0] + ".png";
  }
});
