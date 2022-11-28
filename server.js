const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const app = express();
const PORT = 1899;

const schema = require("./Schemas");

app.use('/graphql', graphqlHTTP ({
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log('server is running');
})