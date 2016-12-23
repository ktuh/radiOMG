import { Mongo } from 'meteor/mongo';
import { ShowsSchema } from './shows_schema.js';
import { orion } from 'meteor/orionjs:core';

export const Shows = new orion.collection('shows', {
	singularName: 'show',
  pluralName: 'shows',
  link: {
    title: 'Shows'
  },
	tabular: {
    columns: [
			 {
        data: 'author',
        title: 'Author'
      }, {
        data: 'showName',
        title: 'Show Name',
      },
			{
        data: 'featuredImage',
        title: 'Featured Image',
        render: function (val, type, doc) {
					if (!val)
						return;
          console.log(val);
          return "<img src=" + val.url + ">";
        }
      },
      orion.attributeColumn('createdAt', 'submitted', 'Timestamp')
    ]
  }
});

Shows.friendlySlugs({
	slugFrom: 'showName',
	slugField: 'slug',
	distinct: true,
	updateSlug: false
});

Shows.attachSchema(ShowsSchema);
