import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import { projectPlugins } from '../config/dependencies.js';

export const js = () => {
    return app.gulp.src(app.path.source.js)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.sync.stream());
};

export const jsPlugins = () => {
    return app.gulp.src(projectPlugins)
        .pipe(app.plugins.newer(`${app.path.build.js}plugins.min.js`))
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JSPLUGINS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(concat('plugins.js'))
        .pipe(uglify())
        .pipe(app.plugins.rename('plugins.min.js'))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.sync.stream());
};
