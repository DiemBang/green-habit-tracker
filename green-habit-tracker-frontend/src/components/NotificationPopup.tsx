import { IUserNotification } from "../models/IUserNotification";

export const NotificationPopup = ({
  notifications,
  onClose,
}: {
  notifications: IUserNotification[];
  onClose: () => void;
}) => {
  if (!notifications.length) {
    return (
      <div className="notification-popup relative">
        <div className="fixed right-0 left-0 top-16 m-auto bg-cloudWhite shadow-md rounded-lg p-4 w-68 z-50">
          <button
            className="absolute top-2 right-0.5 p-1 w-6 h-6 !bg-transparent hover:text-black"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
          <p className="text-gray-600 text-center">No notifications yet!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-16 m-auto bg-cloudWhite shadow-md rounded-lg p-4 w-[100%] lg:w-[50%] z-50">
      <button
        className="absolute top-2 right-1.5 p-1 w-6 h-6 !bg-transparent hover:text-black"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>
      <div className="flex justify-between items-center mb-2 pr-8">
        <h3 className="text-lg font-semibold m-0">Notifications</h3>
      </div>
      <ul className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-headerAndFooterColor scrollbar-track-transparent">
        {notifications.map((notif, index) => (
          <li
            key={notif._id}
            className={`p-2 ${notif.read ? "text-gray-500" : "text-black"} ${
              index !== notifications.length - 1
                ? "border-b border-gray-300"
                : ""
            } hover:bg-gray-100`}
          >
            {notif.message}
          </li>
        ))}
      </ul>
    </div>
  );
};
