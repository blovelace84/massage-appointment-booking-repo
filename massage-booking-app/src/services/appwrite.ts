import { Client, Account, Databases, Models } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject('YOUR_PROJECT_ID'); // Your project ID

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