'use strict'

const Hapi = require('@hapi/hapi');
const hbs = require('hbs');

const defaultHost = process.env.HOST || '0.0.0.0';
const defaultPort = Number.parseInt(process.env.PORT, 10) || 3000;

const startServer = async ({ host = defaultHost, port = defaultPort } = {}) => {
    const server = Hapi.server({
        port,
        host
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
    });    server.route({
        path: "/health",
        method: "GET",
        handler: () => "ok"
    });
    // wedding details route
    server.route({
        path: "/wedding.html",
        method: "GET",
        handler: {
            view: {
                template: 'wedding',
                context: {
                    title: 'Frances and David\'s wedding details'
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

    await server.start();
    console.log("Hapi server started @", server.info.uri);
    return server;
};


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

if (require.main === module) {
    startServer();
}

module.exports = { startServer };

