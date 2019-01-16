import './charts_create.html';
import { CSV } from 'meteor/clinical:csv';
import { Session } from 'meteor/session';
import Charts from '../../../api/charts/charts_collection.js';
import { $ } from 'meteor/jquery';
import { AutoForm } from 'meteor/aldeed:autoform';
import moment from 'moment-timezone';

ReactiveTemplates.set('collections.charts.create', 'chartsCreate');

AutoForm.hooks({
  createChartForm: {
    before: {
      insert: function(doc) {
        doc.slug = doc.title.toLowerCase().split(' ').join('-');
        var daDate = moment(doc.chartDate, 'Pacific/Honolulu');
        var mo = daDate.month();
        if (daDate.month() < 10) {
          mo = '0' + mo;
        }
        doc.slug += '-' + [daDate.year(), mo, daDate.day()].join('-');
        doc.tracks = [];
        if (Session.get('uploadedData'))
          Session.get('uploadedData').forEach(function(track, i) {
            doc.tracks[i] = {};
            doc.tracks[i].artist = track.Artist;
            doc.tracks[i].release = track.Record;
            doc.tracks[i].label = track.Label;
          });
        this.result(doc);
      }
    },
    onError: function (name, error) {
      console.log(name + ' error:', error);
    },
    onSuccess: function() {
      RouterLayer.go(this.collection.indexPath());
    }
  }
});

Template.chartsCreate.onRendered(function() {
  Session.set('uploadedData', undefined);
});

Template.chartsCreate.helpers({
  collection: () => Charts,
  csvUploaded: () => Session.get('uploadedData') !== undefined
});

Template.chartsCreate.events({
  'click #uploadCsv': function(event) {
    event.preventDefault();
    $('#hiddenUpload').click();
  },
  'change #hiddenUpload': function(event) {
    event.preventDefault();
    var files = event.currentTarget.files;
    if (files.length) {
      var file = files[0];

      if (file.type === 'text/csv') {
        var reader = new FileReader();
        reader.onload = function() {
          var csvJson = CSV.parse(
            reader.result.substring(0, reader.result.length - 1), {
              header: true,
              delimiter: ','
            });
          Session.set('uploadedData', csvJson.data);
        }
        reader.onerror = function() {
          throw 'Error reading CSV.';
        }
        reader.readAsText(file);
      }
    }
  },
  'click .submit-btn': function () {
    $('#createChartForm').submit();
  }
});
