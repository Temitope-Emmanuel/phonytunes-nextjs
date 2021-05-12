/* global importScripts, firebase */
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js')

firebase.initializeApp({
    apiKey: "AIzaSyDH4ulVYc1xXYCY4YMi5ZT9LodjS50A5CY",
    authDomain: "phonytunes-b32d2.firebaseapp.com",
    projectId: "phonytunes-b32d2",
    storageBucket: "phonytunes-b32d2.appspot.com",
    messagingSenderId: "1087144626907",
    appId:"1:1087144626907:web:c90cba6b23ebbfc4e4dafe",
    measurementId: "G-24HFM2P9CV"
})

const messaging = firebase.messaging()


messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message in the background message handler ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/carouselImage/amazon.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
// messaging.onMessage((payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };
  
//     return self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
  
  self.addEventListener("activate",evt => {
      console.log("we are listening")
  })
  self.addEventListener("install",evt => {
      console.log("successfully installed")
  })