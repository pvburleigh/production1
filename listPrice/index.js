var Connection = require('tedious').Connection;
var Request = require('tedious').Request
const config = require('../local.settings.json').dbCredentials;
const executeSQL = (context, id) => {
    let result = {};

    // Create Connection object
    const connection = new Connection(config)

    // Create the command to be executed
    const request = new Request(`(SELECT list_price FROM production.products WHERE product_id = ${id})`, function (err) {
        if (err) {
            context.log.error(err);
            context.res.status = 500;
            context.res.body = "Error executing T-SQL command";
        } else {
            context.res = {
                body: result["1"]["list_price"]["value"]
            }
        }
        context.done();
    });

    // Handle 'connect' event
    connection.on('connect', err => {
        if (err) {
            context.log.error(err);
            context.res.status = 500;
            context.res.body = "Error connecting to Azure SQL query";
            context.done();
        }
        else {
            // Connection succeeded so execute T-SQL
            connection.execSql(request);
        }
    });

    // Handle result set sent back from Azure SQL
    request.on('row', columns => {
        counter = 1;
        result[counter] = {}
        columns.forEach(column => {
            result[counter][column.metadata.colName] = column
        });
        counter += 1
    });

    // Connect
    connection.connect();
}

module.exports = function (context, req) {

    const id = (req.query.id || (req.body && req.body.id));

    executeSQL(context, id)
}