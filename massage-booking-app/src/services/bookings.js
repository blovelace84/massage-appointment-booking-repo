import { databases } from './appwrite';

const DB_ID = 'YOUR_DB_ID';
const BOOKINGS_COLLECTION_ID = 'YOUR_COLLECTION_ID';

export async function createBooking(userId, therapistId, date, time) {
  return await databases.createDocument(DB_ID, BOOKINGS_COLLECTION_ID, 'unique()', {
    userId,
    therapistId,
    date,
    time,
    status: 'pending',
  });
}

export async function listBookings() {
  return await databases.listDocuments(DB_ID, BOOKINGS_COLLECTION_ID);
}
