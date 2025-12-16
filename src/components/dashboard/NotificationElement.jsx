import React, { useState } from "react";

const NotificationElement = ({ notifications }) => {
  const countNotificationForCategory = (category) => {
    return notifications.filter((n) => n.category === category).length;
  };

  return (
    <div
      className="thm-bg-light mt-4 thm-shadow-m  rounded-3 p-3"
      style={{ height: "300px" }}
    >
      <p className="fs-4">
        <i class="bi bi-check-circle-fill text-success"></i> Notifications de
        routine: {countNotificationForCategory("Notification de routine")}
      </p>
      <p className="fs-4">
        <i class="bi bi-question-circle-fill text-primary"></i> Notifications de
        vérification:{" "}
        {countNotificationForCategory("Notification de vérification")}
      </p>
      <p className="fs-4">
        <i class="bi bi-exclamation-circle-fill text-warning"></i> Notifications
        de danger: {countNotificationForCategory("Notification de danger")}
      </p>
      <p className="fs-4">
        <i class="bi bi-exclamation-circle-fill text-danger"></i> Notifications
        critique: {countNotificationForCategory("Notification critique")}
      </p>
    </div>
  );
};

export default NotificationElement;
