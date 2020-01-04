const NotificationController = {

  async requestPermission(): ?Boolean {
    if ('Notification' in window) {
      try {
        await Notification.requestPermission();
        return true;
      } catch (err) {
        throw false;
      }
    } else {
      console.error('Your browser is not compatible with notifications');
    }
  },

  notification(title: string, options: ?object) {
    try {
      new Notification(title, options);
    } catch (error) {
      console.error('Problem showing notification', error);
    }
  },

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },

  async enableServiceWorker(): ServiceWorker {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        return await navigator.serviceWorker.register('ServiceWorker.js')
      } catch (err) {
        console.error('Service Worker Error', err);
      }
    } else {
      console.error('Push messaging is not supported');
    }
  },

  /**
   * Preparing to accept notifications from the server
   */
  async triggerPushNotification(subscribeServer: string, publicVapidKey: string) {
  },

  /**
   * Preparing to accept notifications from the server
   */
  async getRegistrationServiceWorker(): ?Promise<Object> {
    if ('serviceWorker' in navigator) {
      try {
        return navigator.serviceWorker.getRegistration();
      } catch (error) {
        console.error('Problem showing notification', error);
      }
    }
  }


};

module.exports = NotificationController;
