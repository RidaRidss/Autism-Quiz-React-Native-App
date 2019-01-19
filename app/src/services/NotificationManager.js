import { Actions } from "react-native-router-flux";
import PushNotification from "react-native-push-notification";
import { AsyncStorage } from "react-native";

class NotificationManager {
  NotificationConfig() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: token => {
        console.log("TOKENN:", token);
        AsyncStorage.setItem("TOKEN", JSON.stringify({ token }), () => {});
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);
        const clicked = notification.userInteraction;
        if (clicked) {
          console.log("user clicked on notification");
          // on tap notification user will navigate to home screen with notification response
          Actions.result({ data: notification.data });
        }
      },
      popInitialNotification: true,
      requestPermissions: true
    });

    PushNotification.checkPermissions(() => {
      return {
        alert: true,
        badge: true,
        sound: true
      };
    });
  }
}

export default new NotificationManager();
