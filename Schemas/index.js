const graphql = require('graphql');
const {
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLList,
    GraphQLNonNull
} = graphql;

let bookData = require("../bookstore.json");
const bookType = require("./TypeDefinition/bookType.js");

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: {
        book: {
            type: bookType,
            description: 'Get book by Id',
            args: { 
                id: {type: GraphQLInt}
            },
            resolve(parent, args) {return bookData.find(book => book.id === args.id)}
        },
        books: {
                type: new GraphQLList(bookType),
                description: 'List of Books',
                args: { 
                    limit: {type: GraphQLInt},
                    offset: {type: GraphQLInt},
                    title: {type: GraphQLString},
                    author: {type: GraphQLString},
                    isbn: {type: GraphQLString},
                    category: {type: GraphQLString},
                    inventory: {type: GraphQLInt},
                    status: {type: GraphQLString},
                },
                resolve(parent, args) {
                    const {offset, limit} = args;
                    let books = bookData;
    
                    if (args.title) {
                        books = books.filter(book => book.title === args.title);
                    } 
                    if (args.author) {
                        books = books.filter(book => book.author === args.author);
                    } 
                    if (args.isbn) {
                        books = books.filter(book => book.isbn === args.isbn);
                    } 
                    if (args.inventory && args.eq) {
                        books = books.filter(book => book.inventory >= args.inventory);
                    } 
                    if (args.category) {
                        books = books.filter(book => book.category === args.category);
                    } 
                    if (args.status) {
                        books = books.filter(book => book.status === args.status);
                    } 
    
                    return books.slice(offset, limit + offset)
                }
            }
    }
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook: {
            type: bookType,
            description: "For adding a new book to the database",
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                author: {type: new GraphQLNonNull(GraphQLString)},
                isbn: {type: new GraphQLNonNull(GraphQLString)},
                category: {type: new GraphQLNonNull(GraphQLString)},
                inventory: {type: GraphQLInt},
                notes: {type: GraphQLString},
                status: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                const book = {
                    id: bookData.length +1,
                    title: args.title,
                    author: args.author,
                    isbn: args.isbn,
                    category: args.category,
                    inventory: args.inventory || 0,
                    notes: args.notes,
                    status: args.status,
                }
                bookData.push(book)
                return book;
            }
        },
        updateBook: {
            type: bookType,
            description: "update a book",
            args: {
                id: {type: GraphQLInt},
                title: {type: GraphQLString},
                author: {type: GraphQLString},
                category: {type: GraphQLString},
                inventory: {type: GraphQLInt},
                notes: {type: GraphQLString},
                status: {type: GraphQLString},
            },
            resolve: (parent, args) => {
                let newBook = {}
                bookData = bookData.map(book => {
                    const {id, title, inventory, notes, status, author, category} = args;
                    if (book.id === id) {
                        if (title) book.title = title;
                        if (author) book.author = author;
                        if (category) book.category = category;
                        if (inventory) book.inventory = inventory;
                        if (notes) book.notes = notes;
                        if (status) book.status = status;

                        newBook = {...book};
                        return {...book};
                    }
                  
                    return book;
                });
                
                return newBook;
            }
        }
    }
});

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation});