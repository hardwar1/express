const sourceFolder = `./source`;
const buildFolder = `./build`;

export const dev = {
    root: `${sourceFolder}/`,
    data: `${sourceFolder}/data/`,
    files: `${sourceFolder}/files/`,
    fonts: `${sourceFolder}/fonts/`,
    images: `${sourceFolder}/images/`,
    icons: `${sourceFolder}/images/icons/`,
    iconsHtml: `${sourceFolder}/images/icons-html/`,
    layouts: `${sourceFolder}/layouts/`,
    modules: `${sourceFolder}/modules/`,
    plugins: `${sourceFolder}/plugins/`,
    scripts: `${sourceFolder}/scripts/`,
    styles: `${sourceFolder}/styles/`,
}

export const path = {
    sourceFolder: sourceFolder,
    buildFolder: buildFolder,
    clean: buildFolder,
    source: {
        fonts: `${dev.fonts}**/*.{woff,woff2}`,
        html: `${dev.root}*.html`,
        style: `${dev.styles}*.scss`,
        js: `${dev.scripts}*.js`,
        images: [`${dev.images}**/*.{jpg,jpeg,png,gif,webp,svg}`, `!${dev.iconsHtml}*`],
        icons: `${dev.icons}**/*.svg`,
        iconsHtml: `${dev.iconsHtml}**/*.svg`,
        jsPlugins: `${dev.plugins}**/*.js`,
        files: `${dev.files}**/*.*`,
    },
    watch: {
        html: `${dev.root}**/*.html`,
        data: `${dev.data}**/*.yml`,
        styles: `${dev.root}**/*.scss`,
        js: `${dev.root}**/*.js`,
        images: `${dev.images}**/*.*`,
        icons: `${dev.icons}**/*.svg`,
        iconsHtml: `${dev.iconsHtml}**/*.svg`,
    },
    build: {
        fonts: `${buildFolder}/fonts/`,
        html: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        images: `${buildFolder}/images/`,
    },
}
