import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

import { root } from './../service/user.service.graphql.js';

// Graphql config
const graphqlSchema = buildSchema(`
    type User{
        id:String,
        fullname: String
    }

    input UserInput{
        username:String
    }

    type Query{
        getUsers: [User]
    }
`);

export const userGraphqlController = () => {
	return graphqlHTTP({
		schema: graphqlSchema,
		rootValue: root,
		graphiql: true,
	});
};
