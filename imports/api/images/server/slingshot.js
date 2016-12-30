import { Slingshot } from 'meteor/edgee:slingshot';
import { Meteor } from 'meteor/meteor';

Slingshot.fileRestrictions('uploadImg', {
	allowedFileTypes: ['image/jpeg', 'image/png'],
	maxSize: 2 * 1024 * 1024
});

Slingshot.createDirective("uploadImg", Slingshot.S3Storage, {
	AWSAccessKeyId: Meteor.settings.awsKey,
	AWSSecretAccessKey: Meteor.settings.awsSecret,
	bucket: Meteor.settings.bucket,
	acl: "public-read",
	region: Meteor.settings.awsRegion,
	authorize: function() {
		return true;
	},
	key: function(f) {
		return Meteor.user().username + "_" + f.name;
	}
});
