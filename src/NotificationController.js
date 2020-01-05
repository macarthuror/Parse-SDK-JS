const NotificationController = {

  permissionStatus(): String {
    return window.Notification.permission;
  },

  async permission(): Promise {
    if ('Notification' in window) {
      if (window.Notification.permission === 'granted') {
        console.log('You already have notifications permission');
        return true;
      } else if (window.Notification.permission === 'denied') {
        throw 'The user needs to allow notifications manually';
      }
      return window.Notification.requestPermission();
    } else {
      throw 'Your browser is not compatible with notifications';
    }
  },

  async notification(title: string, options: object): Promise {
    if (window.Notification.permission === 'granted') {
      try {
        new Notification(title, options);
        return true;
      } catch (error) {
        throw 'Problem showing notification';
      }
    } else {
      throw 'Parse.Notification.permission() must be called first';
    }
  }

};

module.exports = NotificationController;
