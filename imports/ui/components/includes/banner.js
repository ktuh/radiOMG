import './banner.html';
import { getLocalTime } from '../../../startup/lib/helpers.js';

Template.banner.helpers({
  colorClass: (sev) => ["light", "medium", "dark"][sev],
  within: (start, end) => {
    var now = getLocalTime().toDate();
    return start < now && now < end;
  }
});
