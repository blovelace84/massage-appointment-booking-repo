import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint("https://nyc.cloud.appwrite.io/v1") // Your Appwrite Endpoint;
    .setProject("68c2b4f100146459a771");

export const account = new Account(client);
export const databases = new Databases(client);

export default client;