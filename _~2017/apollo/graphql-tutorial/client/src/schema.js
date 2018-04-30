export const typeDefs = `
    type Channel {
        # id is required
        id: ID!
        name: String
    }
    type Query {
        channels: [Channel]
    }
`