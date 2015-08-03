var Hapi = require('hapi'),
    async = require('async'),
    hostname = 'francesanddavid.com',
    port = 80;


console.dir(process.argv);
if (process.argv[2] === 'localhost') {
    hostname = 'localhost';
}

if (process.argv[3] === '8000') {
    port = 8000;
}

var server = new Hapi.Server();
server.connection({
    host: hostname,
    port: port
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
