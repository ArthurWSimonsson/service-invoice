const graphql = require('graphql')
const invoiceController = require('../controllers/invoiceController')

const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql

const invoiceType = new GraphQLObjectType({
	name: 'Invoice',
	fields: () => ({
		_id: { type: GraphQLID },
		sendDate: { type: GraphQLString },
		dueDate: { type: GraphQLString },
		customerNr: { type: GraphQLInt },
		invoiceNr: { type: GraphQLInt },
		total: { type: GraphQLString }
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		invoices: {
			type: GraphQLList(invoiceType),
			async resolve(parent, args) {
				return await invoiceController.getInvoices();
			}
		}
	}
})

const Mutations = new GraphQLObjectType({
	name: 'Mutations',
	fields: {
		addInvoice: {
			type: invoiceType,
			args: {
                _id: { type: GraphQLID },
                sendDate: { type: GraphQLString },
                dueDate: { type: GraphQLString },
                customerNr: { type: GraphQLInt },
                invoiceNr: { type: GraphQLInt },
                total: { type: GraphQLString },    
                currency: { type: GraphQLString},
                clientUUID: { type: GraphQLInt}
            },
			async resolve(parent, args) {
                const data = await invoiceController.addInvoice(args)
				return data
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutations
})