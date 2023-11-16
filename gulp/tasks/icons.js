import cheerio from 'gulp-cheerio';
import svgSprite from "gulp-svg-sprite";

export const iconsToHtml = () => {
    return app.gulp.src(app.path.source.iconsHtml)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IconsHTML",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[fill-opacity]').removeAttr('fill-opacity');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(app.plugins.replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                spriteHtml: {
                    dest: 'sprite/',
                    mode: 'symbol',
                    sprite: `../icons.html`,
                    inline: true,
                    example: true,
                }
            }
        }))
        .pipe(app.plugins.beautify.html({
            editorconfig: true,
            wrap_attributes: 'preserve',
        }))
        .pipe(app.gulp.dest(`${app.dev.modules}_global/`));
}

export const iconsToSvg = () => {
    return app.gulp.src(app.path.source.icons)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IconsSVG",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(cheerio({
            run: function ($) {},
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(svgSprite({
            mode: {
                spriteStack: {
                    dest: 'sprite/',
                    mode: 'stack',
                    sprite: `../../../images/sprite.svg`,
                    example: true,
                }
            }
        }))
        .pipe(app.gulp.dest(`${app.dev.modules}_global/`));
}
