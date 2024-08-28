import * as Notifications from 'expo-notifications';

export async function scheduleTodoNotification(todo, time) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Todo Reminder",
      body: `It's time to: ${todo}`,
    },
    trigger: {
      seconds: (time - new Date().getTime()) / 1000, // Convert to seconds
    },
  });
}
