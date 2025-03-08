// this file must be in root folder
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: "AIzaSyAUKoynqhlVNOTOuc1ndCX5cVrBHTK88Zw",
  authDomain: "openinghearts-a2ec6.firebaseapp.com",
  projectId: "openinghearts-a2ec6",
  storageBucket: "openinghearts-a2ec6.firebasestorage.app",
  messagingSenderId: "511302607628",
  appId: "1:511302607628:android:f23a510fc36dbf5f975f29",
};

// receiving messages in background
const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

// get this type of message in background
messaging.onBackgroundMessage(function (payload) {
    if (!payload.hasOwnProperty('notification')) {
        const notificationTitle = payload.data.title
        const notificationOptions = {
            body: payload.data.body,
            click_action : payload.data.click_action
        }
        self.registration.showNotification(notificationTitle, notificationOptions);
        self.addEventListener('notificationclick', function (event) {
            const clickedNotification = event.notification
            
            clickedNotification.close();
            event.waitUntil(
                clients.openWindow(payload.data.click_action)
            )
        })
    }
})