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
        console.error('The user needs to allow notifications manually');
        throw false;
      }
      return window.Notification.requestPermission();
    } else {
      console.error('Your browser is not compatible with notifications');
      throw false;
    }
  },

  async notification(title: string, options: object): Promise {
    if (window.Notification.permission === 'granted') {
      try {
        new Notification(title, options);
        return true;
      } catch (error) {
        console.error('Problem showing notification', error);
        throw false;
      }
    } else {
      console.error('Parse.Notification.permission() must be called first');
      throw false;
    }
  }

};

module.exports = NotificationController;
