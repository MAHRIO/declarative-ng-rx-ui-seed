'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const init = async () => {

    console.log(Path.join(__dirname, ''));
    const server = Hapi.server({
        port: process.env.PORT || 4000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname)
            }
        }
    });

    await server.register(require('@hapi/inert'));


    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return h.file('view.html')
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();