// Imports Firebase
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Import config Firebase DEV
import { app } from './firebase-config-dev.js';

// Initialisation des services Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// Vérifie si l'utilisateur est connecté
onAuthStateChanged(auth, (user) => {
  if (user) {
    const welcomeText = document.getElementById("welcome");
    if (welcomeText) {
      welcomeText.innerText = `Bienvenue ${user.displayName || user.email} 👋`;
    }
  } else {
    window.location.href = "/login.html";
  }
});

// Déconnexion
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        window.location.href = "/login.html";
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      }
    });
  }
});
