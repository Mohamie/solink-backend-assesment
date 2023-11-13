export const typeDefs = `#graphql
  type User {
    id: ID!,
    firstName: String,
    lastName: String,
    age: Int,
    tasks: [Task!]
  }
 
  type Task {
    id: ID!,
    description: String,
    completed: Boolean,
    user: User!
  }

  type ResponseMessage{
    message: String
  }

  type Query {
    tasks(userId: ID!): [Task] 
    task(userId: ID!, taskId: ID!): Task 
  }

  type Mutation {
    createUser(user: CreateUserInput!): ResponseMessage  
    createTask(userId: ID!, task: CreateTaskInput!): ResponseMessage 
    updateTask(userId: ID!, taskId: ID!, task: UpdateTaskInput!): ResponseMessage 
    completeTask(userId: ID!, taskId: ID!): ResponseMessage 
    deleteTask(userId: ID!, taskId: ID!): ResponseMessage 
  }

  input CreateUserInput{
    firstName: String!
    lastName: String!
    age: Int!
  }
  
  input UpdateUserInput{
    firstName: String
    lastName: String
    age: Int
  }
  
  input CreateTaskInput{
    description: String!
    completed: Boolean!
  }
  
  input UpdateTaskInput{
    description: String
    completed: Boolean
  }
`;

