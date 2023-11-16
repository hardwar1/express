import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    return app.gulp.src(`${app.dev.fonts}otf/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(app.gulp.dest(`${app.dev.fonts}ttf/`))
}

export const ttfToWoff = () => {
    return app.gulp.src(`${app.dev.fonts}ttf/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(app.gulp.dest(`${app.dev.fonts}woff/`))
        .pipe(app.gulp.src(`${app.dev.fonts}ttf/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(`${app.dev.fonts}woff/`));
}

export const fontsStyle = () => {
    // styles file
    let fontsFile = `${app.dev.styles}_service/fonts.scss`;
    // check font files
    fs.readdir(`${app.dev.fonts}woff/`, function (err, fontsFiles) {
        if (fontsFiles) {
            // check styles file
            if (!fs.existsSync(fontsFile)) {
                // create styles file
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    // add font into styles file
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile, `@font-face {\n\tfont-family: "${fontName}";\n\tfont-style: normal;\n\tfont-weight: ${fontWeight};\n\tsrc: local("${fontFileName}"),\n\t\turl("../fonts/${fontFileName}.woff2") format("woff2"),\n\t\turl("../fonts/${fontFileName}.woff") format("woff");\n\tfont-display: swap;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                // if styles file exists
                console.log("fonts.scss already exists. To update the file, you need to delete it.")
            }
        }
    });
    return app.gulp.src(`${app.dev.root}`);
    function cb() { }
}
