import PocketBase from 'pocketbase';

const url = import.meta.env.VITE_APP_POCKETBASEURL;
const db = new PocketBase(url);

export default db;