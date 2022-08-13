'use strict'

const hostname = 'francesanddavid.com';
const port = 80;
const Hapi = require('@hapi/hapi');
const hbs = require('hbs');

const init = async () => {
    const server = Hapi.server({
        port: port,
        host: hostname
    });

    await server.register(require('@hapi/inert'));
    await server.register(require('@hapi/vision'));

    server.views({
        engines: {
            html: hbs
        },
        relativeTo: __dirname,
        path: 'views'
    });

    server.route({
        path: "/",
        method: "GET",
        handler: {
            view: {
                template: 'index',
                context: {
                    title: 'Frances and David dot com'
                }
            }
        }
    });

    //program route
    server.route({
        path: "/program",
        method: "GET",
        handler: {
            view: {
                template: 'program',
                context: {
                    title: 'Frances and David\'s wedding program'
                }
            }
        }
    });


    // Setup static files
    server.route({
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: 'assets'
            }
        }
    });
    await server.start()
    console.log("Hapi server started @", server.info.uri);
};


process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
});

init();
