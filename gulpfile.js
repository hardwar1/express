import gulp from 'gulp';

// Global paths
import { path, dev } from './gulp/config/path.js';

// Global plugins
import { plugins } from './gulp/config/plugins.js';

// Global values
global.app = {
    gulp: gulp,
    path: path,
    dev: dev,
    plugins: plugins,
}

// Tasks
import { clean } from './gulp/tasks/clean.js';
import { copy, copyFonts } from './gulp/tasks/copy.js';
import { html } from './gulp/tasks/html.js';
import { style, styleMin } from './gulp/tasks/style.js';
import { js, jsPlugins } from './gulp/tasks/js.js';
import { server } from './gulp/tasks/server.js';
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { images } from "./gulp/tasks/images.js";
import { iconsToHtml, iconsToSvg } from "./gulp/tasks/icons.js";

// Watcher
export const watch = () => {
    gulp.watch(app.path.watch.styles, gulp.series(style, styleMin));
    gulp.watch([app.path.watch.html, app.path.watch.data], gulp.series(html));
    gulp.watch(app.path.watch.js, gulp.series(js, jsPlugins));
    gulp.watch(app.path.watch.images, gulp.series(images));
    gulp.watch(app.path.watch.icons, gulp.series(iconsToHtml, iconsToSvg));
};

// Main tasks
const mainTasks = gulp.series(gulp.parallel(copy, copyFonts, style, html, js, jsPlugins, images, iconsToHtml, iconsToSvg), styleMin);

// Scenarios
export default gulp.series(clean, mainTasks, gulp.parallel(watch, server));
export const build = gulp.series(clean, mainTasks);
export const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
export const imagesMin = gulp.series(images);
export const cleanBuild = gulp.series(clean);
