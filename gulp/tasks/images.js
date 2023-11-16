import webp from "gulp-webp";
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from "gulp-imagemin";

export const images = () => {
    return app.gulp.src(app.path.source.images)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(webp({
            quality: 100,
            method: 0,
        }))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.gulp.src(app.path.source.images))
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(imagemin([
            // gifsicle({ interlaced: true }),
            // mozjpeg({ quality: 89, progressive: true }),
            // optipng({ optimizationLevel: 2 }),
            svgo({
                plugins: [
                    {
                        name: 'preset-default',
                        params: {
                            overrides: {
                                removeViewBox: false,
                            },
                        }
                    },
                ]
            })
        ]))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.sync.stream());
}
