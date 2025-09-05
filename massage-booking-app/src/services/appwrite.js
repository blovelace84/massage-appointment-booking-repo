import { Client, Account, Databases } from 'react-native-appwrite';

const client = new Client();
client
  .setEndpoint('https://nyc.cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('68bac70b0030dad2ef3f');

export const account = new Account(client);
export const databases = new Databases(client);
