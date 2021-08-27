importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAGLoe812akN97h2LVKZoUc3eHdeFGz9SI",
  authDomain: "myo2-56c74.firebaseapp.com",
  projectId: "myo2-56c74",
  storageBucket: "myo2-56c74.appspot.com",
  messagingSenderId: "930773898003",
  appId: "1:930773898003:web:deb1bc3bf445f4d77e40e6",
  measurementId: "G-KY9TKCQG6K"
})

const messaging = firebase.messaging();

// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
  self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    try {
      const applicationServerKey = urlB64ToUint8Array(
        'BDyuz6dhluPhjgRmw1r9qbiRbRvYAmlCHv2nFRod0hjw9QYTOSFX81WzmDhLwVVTr8156iMS0FcZlwMcSI6gfp8'
      )
      const options = { applicationServerKey, userVisibleOnly: true }
      const subscription = await self.registration.pushManager.subscribe(options)
      //console.log(JSON.stringify(subscription))
    } catch (err) {
      console.log('Error', err)
    }
  })