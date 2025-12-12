import React, { useState, useEffect } from "react";

const NotificationCard = ({ id, category, content, onDelete }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    switch (category) {
      case "Notification de routine":
        setColor("#03a65d");
        break;
      case "Notification de vérification":
        setColor("#0070e0");
        break;
      case "Notification de danger":
        setColor("#fc8421");
        break;
      case "Notification critique":
        setColor("#d93054");
        break;
    }
  }, []);
  return (
    <div className="my-2">
      <div className="thm-bg rounded-1 thm-shadow-m">
        <div
          className="ps-5 pe-3 py-3"
          style={{ borderLeft: `50px solid ${color}` }}
        >
          <div className="d-flex justify-content-between">
            <div>
              <p className="fs-4" style={{ color: `${color}` }}>
                {category}
              </p>
            </div>
            <div>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => onDelete(id)} // 🔥 Removes from localStorage
              ></button>
            </div>
          </div>
          <p className="fs-5">{content}</p>
          <p className="text-decoration-underline text-primary">
            Cliquez pour plus de détails
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
