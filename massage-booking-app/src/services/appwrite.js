import { Client, Account, Databases } from 'react-native-appwrite';

const client = new Client();
client
  .setEndpoint('http://localhost/v1') // Replace with your Appwrite endpoint
  .setProject('YOUR_PROJECT_ID');

export const account = new Account(client);
export const databases = new Databases(client);
