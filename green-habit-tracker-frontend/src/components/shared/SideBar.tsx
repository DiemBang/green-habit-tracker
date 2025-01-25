import avatar from "../../assets/rabbit.svg";

export const SideBar = () => {
  return (
    <aside className="hidden lg:flex bg-gray-100 w-40 p-4 pt-10 h-[calc(100vh-4rem)] top-16 flex-col fixed left-0 shadow-lg">
      {/* Profile Section */}
      <section className="flex flex-row items-center space-x-4 mb-6">
        <img
          src={avatar}
          alt="avatar profile"
          className="w-10 h-10 rounded-full shadow-md"
        />
      </section>

      {/* Navigation Menu */}
      <nav>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-gray-600">
              dashboard
            </span>
            <a
              href="/home"
              className="text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              Dashboard
            </a>
          </li>
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-gray-600">
              explore
            </span>
            <a
              href="/explore"
              className="text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              Explore
            </a>
          </li>
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-gray-600">
              person
            </span>
            <a
              href="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              Profile
            </a>
          </li>
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-gray-600">
              info
            </span>
            <a
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              About
            </a>
          </li>
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-gray-600">
              school
            </span>
            <a
              href="/tutorial"
              className="text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              Tutorial
            </a>
          </li>
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-gray-600">
              settings
            </span>
            <a
              href="/settings"
              className="text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              Settings
            </a>
          </li>
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-red-600">
              logout
            </span>
            <a
              href="/login"
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Sign out
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
