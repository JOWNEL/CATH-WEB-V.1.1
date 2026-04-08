// firebase.js - Firebase Configuration & Module Exports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signOut, 
  onAuthStateChanged, 
  setPersistence, 
  browserSessionPersistence 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  onSnapshot, 
  query, 
  where, 
  getDocs, 
  getDoc, 
  orderBy, 
  writeBatch,
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyC-uy3DLim-C06ueatkNCr9bZ-4Cnqi5E4",
  authDomain: "cath-aesthetics.firebaseapp.com",
  projectId: "cath-aesthetics",
  storageBucket: "cath-aesthetics.firebasestorage.app",
  messagingSenderId: 89600382,
  appId: "1:89600382:web:4b9259e721980ca266c32f",
  measurementId: "G-V4FRRXM4BC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase instances
export const auth = getAuth(app);
export const db = getFirestore(app);

// Set session persistence
export async function initializePersistence() {
  try {
    await setPersistence(auth, browserSessionPersistence);
  } catch (error) {
    console.warn("⚠️ Persistence warning:", error);
  }
}

// Helper: Log activity to Firestore
export async function logActivity(action, details = "", staffName = "", staffId = "", errorStatus = "") {
  try {
    await addDoc(collection(db, "activity_logs"), {
      action: action,
      details: details,
      staff: staffName || "System",
      staffId: staffId || "",
      timestamp: serverTimestamp(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-PH'),
      status: errorStatus ? "error" : "success",
      errorMessage: errorStatus || ""
    });
  } catch (error) {
    console.error("Error logging activity:", error);
  }
}

// Helper: Check user role
export async function getUserRole(email) {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return "employee";
    return snapshot.docs[0].data().role || "employee";
  } catch (error) {
    console.error("Error getting user role:", error);
    return "employee";
  }
}

// Helper: Create initial services if they don't exist
export async function initializeDefaultServices() {
  try {
    const servicesSnapshot = await getDocs(collection(db, "services"));
    if (servicesSnapshot.empty) {
      const defaultServices = [
        {
          name: "Upper Lip & Lower Lip Diode Laser",
          category: "diode",
          description: "Hair removal for lip area using Diode Laser technology",
          price: 588,
          packageSessions: 5,
          packagePrice: 2888,
          freeSessions: 1,
          createdAt: serverTimestamp()
        },
        {
          name: "EmSculpt Treatment",
          category: "emsculpt",
          description: "Non-invasive muscle sculpting with EmSculpt",
          price: 5000,
          packageSessions: 6,
          packagePrice: 28000,
          freeSessions: 0,
          createdAt: serverTimestamp()
        },
        {
          name: "AureLift Face Lift",
          category: "aurelift",
          description: "Non-surgical face and neck lift treatment",
          price: 3500,
          packageSessions: 4,
          packagePrice: 13000,
          freeSessions: 0,
          createdAt: serverTimestamp()
        },
        {
          name: "Full Body Diode Laser",
          category: "diode",
          description: "Complete body hair removal",
          price: 2500,
          packageSessions: 6,
          packagePrice: 13500,
          freeSessions: 1,
          createdAt: serverTimestamp()
        }
      ];

      for (const service of defaultServices) {
        await addDoc(collection(db, "services"), service);
      }
      console.log("✅ Default services initialized");
    }
  } catch (error) {
    console.error("Error initializing services:", error);
  }
}

export { serverTimestamp };
