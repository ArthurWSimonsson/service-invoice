const fastify = require('./server.js')
const gql = require('fastify-gql')
const schema = require('./schema')


fastify.register(gql, {
    schema,
    graphiql: true
 })

const start = async () => {
    try {
        await fastify.listen(3002, '0.0.0.0')
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } 
    catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()