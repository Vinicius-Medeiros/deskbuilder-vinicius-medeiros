import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBj6TuSlEr7xzJaFvYpDL8LPezsCUAVhS8",
	authDomain: "deskbuilder-94bf5.firebaseapp.com",
	projectId: "deskbuilder-94bf5",
	storageBucket: "deskbuilder-94bf5.firebasestorage.app",
	messagingSenderId: "237867110103",
	appId: "1:237867110103:web:4429be76a8cd4cf2ab2a92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
