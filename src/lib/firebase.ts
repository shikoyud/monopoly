import { PUBLIC_FIREBASE_API_KEY, PUBLIC_FIREBASE_APP_ID, PUBLIC_FIREBASE_AUTH_DOMAIN, PUBLIC_FIREBASE_DATABASE_URL, PUBLIC_FIREBASE_MESSAGING_SENDER_ID, PUBLIC_FIREBASE_PROJECT_ID, PUBLIC_FIREBASE_STORAGE_BUCKET } from "$env/static/public";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: PUBLIC_FIREBASE_DATABASE_URL,
  projectId: PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const database = getDatabase(app)

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Auth state changed: User is signed in", user.uid);
  } else {
    console.log("Auth state changed: User is signed out");
  }
});

async function signInAsAnonymous() {
  const user = auth.currentUser;
  if (!user) {
    try {
      const userCredential = await signInAnonymously(auth)
      console.log("Signed in anonymously:", userCredential.user)
      return userCredential.user
    } catch (e) {
      console.error("Error signing in anonymously:", e);
      return null;
    }
  } else {
    console.log("Already signed in anonymously" + user.uid);
    return user;
  }
}
const user = (await signInAsAnonymous())!;
export { database, user };
