import CoreManager from './CoreManager';

const Notification = {

  permissionStatus(): String {
    const controller = CoreManager.getNotificationController();
    return controller.permissionStatus();
  },

  permission(): Promise {
    const controller = CoreManager.getNotificationController();
    return controller.permission();
  },

  notification(title: string, options: object): Promise {
    const controller = CoreManager.getNotificationController();
    controller.notification(title, options);
  }

};

module.exports = Notification;

if (process.env.PARSE_BUILD === 'browser') {
  CoreManager.setNotificationController(require('./NotificationController'));
}
