var Hapi = require('hapi'),
    async = require('async');

var server = new Hapi.Server();
server.connection({
    host: 'francesanddavid.com',
    port: 80
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

// Setup views
server.views({
    engines: {
        html: require('handlebars')
    },
    path: './views'
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

server.start(function() {
    console.log("Hapi server started @", server.info.uri);
});
