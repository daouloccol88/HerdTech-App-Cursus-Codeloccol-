import React, { useEffect, useState } from "react";

const NotificationNumber = ({ category, notifications }) => {
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("");
  const [count, setCount] = useState(0);

  // Update count whenever notifications or category change
  useEffect(() => {
    const c = notifications.filter((n) => n.category === category).length;
    setCount(c);
  }, [notifications, category]);

  // Set color and icon whenever category changes
  useEffect(() => {
    switch (category) {
      case "Notification de routine":
        setColor("#03a65d");
        setIcon("bi-check-circle-fill");
        break;
      case "Notification de vérification":
        setColor("#0070e0");
        setIcon("bi-question-circle-fill");
        break;
      case "Notification de danger":
        setColor("#fc8421");
        setIcon("bi-exclamation-circle-fill");
        break;
      case "Notification critique":
        setColor("#d93054");
        setIcon("bi-x-circle-fill");
        break;
      default:
        setColor("#000");
        setIcon("bi-info-circle-fill");
        break;
    }
  }, [category]);

  return (
    <div className="thm-bg rounded-3 thm-shadow-m p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <i className={`bi ${icon} fs-1`} style={{ color }}></i>
        </div>
        <div>
          <p className="fw-semibold text-center">
            Nombre de notification {category.replace("Notification ", "")}
          </p>
          <p className="text-center fs-3">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationNumber;
