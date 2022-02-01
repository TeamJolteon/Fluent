import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb+srv://user:penguinreactor@cluster0.8svgy.mongodb.net/login?retryWrites=true&w=majority');
  return client;
}
