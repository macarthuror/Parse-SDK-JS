import CoreManager from './CoreManager';

const NotificationController = {
  urlB64ToUint8Array(base64String: string): String {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },

  async register(): Promise<Object> {
    if ('Notification' in window) {
      if (window.Notification.permission !== 'granted') {
        throw 'Parse.Notification.permission() must be called first'
      }
    }
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const URL_SERVICE_WORKER = CoreManager.get('SERVICE_WORKER') || 'sw.js';
      return navigator.serviceWorker.register(URL_SERVICE_WORKER);
    } else {
      throw 'Push messaging is not supported';
    }
  },

  subscribe(): ?Promise {
    const applicationServerPublicKey = CoreManager.get('SERVICE_WORKER_KEY');
    const applicationServerKey = this.urlB64ToUint8Array(applicationServerPublicKey);
    return navigator.serviceWorker.getRegistration()
      .then((data) => {
        if(data) {
          return data.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
          })
        } else {
          throw 'No registered service worker found';
        }
      })
      .catch(error => {
        throw error;
      })
  }
};

module.exports = NotificationController;
