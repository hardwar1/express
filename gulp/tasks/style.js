import gulpSass from 'gulp-sass';
import dartSass from 'sass';
const sass = gulpSass(dartSass);

import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso'; // minify
import postcss from 'gulp-postcss';
import sourcemap from 'gulp-sourcemaps';

export const style = () => {
    return app.gulp.src(app.path.source.style)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SASS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer({
            cascade: false
        })]))
        // .pipe(app.plugins.beautify.css({
        //     editorconfig: true,
        //     wrap_attributes: 'preserve',
        // })) вызывает ошибку в sourcemap
        .pipe(sourcemap.write('maps/'))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.sync.stream());
};

export const styleMin = () => {
    return app.gulp.src([`${app.path.build.css}*.css`, `!${app.path.build.css}*.min.css`])
        .pipe(csso())
        .pipe(app.plugins.rename({ suffix: '.min' }))
        .pipe(app.gulp.dest(`${app.path.build.css}`))
        .pipe(app.plugins.sync.stream());
};
