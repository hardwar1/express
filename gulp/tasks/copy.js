export const copy = () => {
    return app.gulp.src([
        app.path.source.files,
    ], {
        base: app.dev.root
    })
        .pipe(app.gulp.dest(app.path.buildFolder))
        .pipe(app.plugins.sync.stream({
            once: true
        }));
};

export const copyFonts = () => {
    return app.gulp.src([
        `${app.dev.fonts}woff/*.{woff,woff2}`,
    ])
        .pipe(app.gulp.dest(app.path.build.fonts))
        .pipe(app.plugins.sync.stream({
            once: true
        }));
};
