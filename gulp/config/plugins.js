import sync from 'browser-sync';
import plumber from 'gulp-plumber'; // errors
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import beautify from 'gulp-beautify'; // linter
import newer from 'gulp-newer';

export const plugins = {
    sync: sync,
    plumber: plumber,
    notify: notify,
    rename: rename,
    replace: replace,
    beautify: beautify,
    newer: newer,
}
