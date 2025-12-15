import React from "react";

const NotificationElement = ({ notifications }) => {
  const countNotificationForCategory = (category) => {
    return notifications.filter((n) => n.category === category).length;
  };
  return (
    <div className="thm-bg-light mt-4 thm-shadow-m  rounded-3 p-3">
      <p>
        Notifications de routine:{" "}
        {countNotificationForCategory("Notification de routine")}
      </p>
      <p>
        Notifications de vérification:{" "}
        {countNotificationForCategory("Notification de vérification")}
      </p>
      <p>
        Notifications de danger:{" "}
        {countNotificationForCategory("Notification de danger")}
      </p>
      <p>
        Notifications critique:{" "}
        {countNotificationForCategory("Notification critique")}
      </p>
    </div>
  );
};

export default NotificationElement;
