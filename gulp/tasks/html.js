import panini from 'panini';
import entities from 'gulp-html-entities';

export const html = () => {
    panini.refresh();
    return app.gulp.src(app.path.source.html)
        .pipe(panini({
            root: app.dev.root,
            layouts: app.dev.layouts,
            partials: app.dev.modules,
            data: app.dev.data,
        }))
        .pipe(entities('decode'))
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.beautify.html({
            editorconfig: true,
            wrap_attributes: 'preserve',
        }))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.sync.stream());
};
