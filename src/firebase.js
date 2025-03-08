import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect } from 'react';


const firebaseConfig = {
    apiKey: "AIzaSyAUKoynqhlVNOTOuc1ndCX5cVrBHTK88Zw",
    authDomain: "openinghearts-a2ec6.firebaseapp.com",
    projectId: "openinghearts-a2ec6",
    storageBucket: "openinghearts-a2ec6.firebasestorage.app",
    messagingSenderId: "511302607628",
    appId: "1:511302607628:android:f23a510fc36dbf5f975f29",
};



const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging };

export const getTokenn = (setTokenFound, setFcmToken) => {
    return getToken(messaging, { vapidKey: 'BGPMUEemVkrD3bd2sufk3QxKF14zHtRKEf9VkP_TXwTo9gCvT1bPAcp-EA0HDUDTcCTfBvVIecnFCKYgO9DIK-Y' }).then((currentToken) => {
        if (currentToken) {
            setTokenFound(true);
            setFcmToken(currentToken)
        } else {
            setTokenFound(false);
        }
    }).catch((err) => {
    });
}

