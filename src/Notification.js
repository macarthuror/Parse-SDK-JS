import CoreManager from './CoreManager';

const Notification = {
  urlB64ToUint8Array(base64String: string) {
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

  async requestPermission() {
    if (window.Notification.permission === 'granted') {
      console.log('You already have notifications permission');
    } else if (window.Notification.permission === 'denied') {
      console.error('The user needs to allow notifications manually');
    }
    const controller = CoreManager.getNotificationController();
    try {
      await controller.requestPermission();
    } catch (err) {
      console.error('Cannot do it');
    }
  },

  notification(title: string, options: ?object) {
    if (window.Notification.permission === 'granted') {
      const controller = CoreManager.getNotificationController();
      controller.notification(title, options);
    } else {
      console.error('Parse.requestPermission() must be called first');
    }
  },

  /**
   * Preparing to accept notifications from the server
   */
  triggerPushNotification() {
    if (window.Notification.permission === 'granted') {
      const controller = CoreManager.getNotificationController();
      controller.triggerPushNotification('http://localhost:5000/subscribe', 'BLt69O7gzlbncp6bhD2qsXoq3w307Se6W32EER3xlpnKkme8-ymU73xoB-lePqfgN04qmNkFWNVrAiswIeZklhU');
    } else {
      console.error('Parse.requestPermission() must be called first');
    }
  },

  /**
   * Preparing to accept notifications from the server
   */
  async getRegistrationServiceWorker() {
    if (window.Notification.permission === 'granted') {
      const controller = CoreManager.getNotificationController();
      return await controller.getRegistrationServiceWorker();
    } else {
      console.error('Parse.requestPermission() must be called first')
    }
  }
};

module.exports = Notification;

if (process.env.PARSE_BUILD === 'browser') {
  CoreManager.setNotificationController(require('./NotificationController'));
}
