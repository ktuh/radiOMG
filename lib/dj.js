import { Roles } from 'meteor/nicolaslopezj:roles';

const DJ = new Roles.Role('dj');

DJ.allow('collections.shows.index', true);
DJ.allow('collections.shows.insert', true);
DJ.allow('collections.shows.update', true);
DJ.allow('collections.shows.remove', true);
DJ.allow('collections.shows.showCreate', true);
DJ.allow('collections.shows.showUpdate', true);
DJ.allow('collections.shows.showRemove', true);

DJ.helper('collections.shows.indexFilter', {});
