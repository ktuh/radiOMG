import { SimpleSchema } from 'meteor/aldeed:simple-schema';

var NoticesSchema = new SimpleSchema({
  body: {
    type: String,
    autoform: {
      type: 'summernote'
    }
  },
  startDatetime: {
    label: 'Start Date & Time',
    type: Date,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker'
      }
    }
  },
  endDatetime: {
    label: 'End Date & Time',
    type: Date,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker'
      }
    }
  },
  severity: {
    label: 'Severity',
    type: Number,
    allowedValues: [0, 1, 2],
    autoform: {
      options: [
        { label: 'Light', value: 0 },
        { label: 'Medium', value: 1 },
        { label: 'Dark', value: 2 }
      ]
    }
  }
});

export default NoticesSchema;
