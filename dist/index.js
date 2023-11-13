import { AppDataSource } from "./db/data-source.js";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
AppDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
initApolloServer();
async function initApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
}
