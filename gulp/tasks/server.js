export const server = () => {
    app.plugins.sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: app.path.buildFolder,
            index: '1.html'
        },
    });
};
