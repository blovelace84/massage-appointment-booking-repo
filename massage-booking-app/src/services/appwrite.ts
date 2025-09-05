import { Client, Account, Databases, Models } from 'appwrite';

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject('68ba0de6001f5a3753a6'); // Your project ID

export const account = new Account(client);
export const database = new Databases(client);

export type Appointment = {
    $id: string;
    userId: string;
    serviceId: string;
    date: string;
    status: 'booked' | 'completed' | 'canceled';
} & Models.Document;

export default client;