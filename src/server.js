const {graphiqlFastify, graphqlFastify} = require('fastify-graphql');
require("dotenv").config();

const fastify = require('fastify')({
	logger: true
})


fastify.register(require('./routes/invoiceRoutes'))


const mongoose = require('mongoose')

mongoose
	.connect(process.env.DB_CONNECT)
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err))

module.exports = fastify
