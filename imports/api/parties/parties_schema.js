import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { scorpius } from 'meteor/scorpiusjs:core';
import { thumbnailUrl, getLocalTime } from '../../startup/lib/helpers.js';

var PartySchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title'
  },
  startTime: {
    type: Date,
    label: 'Start Time',
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker'
      }
    }
  },
  endTime: {
    type: Date,
    label: 'End Time',
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker'
      }
    }
  },
  location: {
    type: String,
    label: 'Location'
  },
  address: {
    type: String,
    label: 'Address',
    optional: true
  },
  flyerFront: scorpius.attribute('image', {
    label: 'Flyer Front Image'
  }),
  thumbnail: {
    type: String,
    optional: true,
    autoValue: function() {
      var url = this.siblingField('flyerFront.url').value;
      if (url) {
        return thumbnailUrl(url, 648);
      }
    }
  },
  flyerBack: scorpius.attribute('image', {
    label: 'Flyer Back Image (Optional)',
    optional: true
  }),
  thumbnailBack: {
    type: String,
    optional: true,
    autoValue: function() {
      var url = this.siblingField('flyerBack.url').value;
      if (url) {
        return thumbnailUrl(url, 648);
      }
    }
  },
  description: {
    type: String,
    label: 'Description (Optional)',
    optional: true,
    autoform: {
      type: 'summernote'
    }
  },
  submitted: {
    type: Date,
    autoform: {
      label: false,
      type: 'hidden'
    },
    defaultValue: () => getLocalTime().toDate()
  },
  userId: {
    type: String,
    autoform: {
      label: false,
      type: 'hidden'
    },
    autoValue: function () {
      if (this.isUpdate) return this.value;
      return this.userId;
    }
  },
  commentCount: {
    type: Number,
    label: 'Comment Count',
    defaultValue: 0
  },
  upvoteCount: {
    type: Number,
    label: 'Upvote Count',
    defaultValue: 0
  },
  upvoters: {
    type: [String],
    label: 'Upvoters',
    defaultValue: []
  },
  tags: {
    type: [String],
    label: 'Tags',
    optional: true
  },
  approved: {
    type: Boolean,
    label: 'Approved',
    defaultValue: false,
    optional: false
  },
  isFeatured: {
    type: Boolean,
    label: 'Featured',
    defaultValue: false
  },
  slug: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    }
  }
});

export default PartySchema;
