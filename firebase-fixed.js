// firebase.js - Firebase Configuration (Fixed for GitHub Pages)
// This version works without ES6 modules

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyC-uy3DLim-C06ueatkNCr9bZ-4Cnqi5E4",
  authDomain: "cath-aesthetics.firebaseapp.com",
  projectId: "cath-aesthetics",
  storageBucket: "cath-aesthetics.firebasestorage.app",
  messagingSenderId: "89600382",
  appId: "1:89600382:web:4b9259e721980ca266c32f",
  measurementId: "G-V4FRRXM4BC"
};

// Global variables for Firebase instances
let app, auth, db;

// Initialize Firebase when script loads
function initializeFirebase() {
  try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.getAuth(app);
    db = firebase.getFirestore(app);
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

// Helper functions
async function logActivity(action, details = "", staffName = "", staffId = "", errorStatus = "") {
  try {
    if (!db) return;
    await firebase.addDoc(firebase.collection(db, "activity_logs"), {
      action: action,
      details: details,
      staff: staffName || "System",
      staffId: staffId || "",
      timestamp: firebase.serverTimestamp(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-PH'),
      status: errorStatus ? "error" : "success",
      errorMessage: errorStatus || ""
    });
  } catch (error) {
    console.error("Error logging activity:", error);
  }
}

async function getUserRole(email) {
  try {
    if (!db) return "employee";
    const q = firebase.query(firebase.collection(db, "users"), firebase.where("email", "==", email));
    const snapshot = await firebase.getDocs(q);
    if (snapshot.empty) return "employee";
    return snapshot.docs[0].data().role || "employee";
  } catch (error) {
    console.error("Error getting user role:", error);
    return "employee";
  }
}

// Export for use in other scripts
window.firebaseConfig = firebaseConfig;
window.initializeFirebase = initializeFirebase;
window.logActivity = logActivity;
window.getUserRole = getUserRole;
