import { Client, Account, ID } from "react-native-appwrite";

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("68bac70b0030dad2ef3f"); // Your project ID

export const account = new Account(client);
export { ID };
