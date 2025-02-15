// 🔥 Configura Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAE9LhwozmULGT_qGEN0Aau2zsqFlV-1hs",
  authDomain: "webapp-napolitrans.firebaseapp.com",
  databaseURL: "https://webapp-napolitrans-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webapp-napolitrans",
  storageBucket: "webapp-napolitrans.firebasestorage.app",
  messagingSenderId: "817211015807",
  appId: "1:817211015807:web:4ed035ac10775f665bf54a"
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// 📌 Funzione di login con email e password
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
        console.log("✅ Login effettuato!", userCredential.user);
        mostraLogout();
    })
    .catch(error => {
        console.error("❌ Errore di login:", error.message);
        alert("Errore: " + error.message);
    });
}

// 📌 Funzione di registrazione con email e password
function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
        console.log("✅ Registrazione completata!", userCredential.user);
        alert("Registrazione completata! Ora puoi accedere.");
    })
    .catch(error => {
        console.error("❌ Errore di registrazione:", error.message);
        alert("Errore: " + error.message);
    });
}

// 📌 Login con Google
function loginGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(userCredential => {
        console.log("✅ Login con Google completato!", userCredential.user);
        mostraLogout();
    })
    .catch(error => {
        console.error("❌ Errore di login con Google:", error.message);
    });
}

// 📌 Logout
function logout() {
    auth.signOut()
    .then(() => {
        console.log("✅ Logout effettuato!");
        mostraLogin();
    })
    .catch(error => {
        console.error("❌ Errore di logout:", error.message);
    });
}

// 📌 Mostra/Nasconde i pulsanti di login/logout
function mostraLogout() {
    document.getElementById("logoutBtn").style.display = "block";
}

function mostraLogin() {
    document.getElementById("logoutBtn").style.display = "none";
}

// 📌 Controlla se l’utente è loggato
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("🔵 Utente loggato:", user.email);
        mostraLogout();
    } else {
        console.log("⚪ Nessun utente loggato.");
        mostraLogin();
    }
});
