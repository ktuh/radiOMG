import { Roles } from 'meteor/nicolaslopezj:roles';

const DJ = new Roles.Role('dj');

DJ.allow('collections.podcasts.index', true);
DJ.allow('collections.podcasts.insert', true);
DJ.allow('collections.podcasts.update', true);
DJ.allow('collections.podcasts.remove', true);
DJ.allow('collections.podcasts.showCreate', true);
DJ.allow('collections.podcasts.showUpdate', true);
DJ.allow('collections.podcasts.showRemove', true);

DJ.helper('collections.podcasts.indexFilter', {});
