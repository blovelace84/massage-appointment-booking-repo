import { account } from "./appwrite";

//Register new user
export async function register(email, password, name) {
    return await account.create('unique()', email, password, name);
}

//Login existing user
export async function login(email, password) {
    return await account.createEmailSession(email, password);
}

//Get logged in user
export async function getUser() {
    return await account.get();
}

//logout user
export async function logout() {
    return await account.deleteSession('current');
}