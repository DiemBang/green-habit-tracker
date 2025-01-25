import avatar from "../../assets/rabbit.svg";

export const SideBar = () => {
  return (
    <>
      <aside className="hidden lg:block bg-gray-200 w-40 p-4 pt-10 h-[calc(100vh-4rem)] top-16 flex-col fixed left-0">
        <section>
          <img
            src={avatar}
            alt="avatar profile"
            className="w-32 h-32 rounded-full shadow-md"
          />
        </section>
        <nav>
          <ul>
            <li>
              <a href="/dashboard" className="text-blue-500">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/settings" className="text-blue-500">
                Settings
              </a>
            </li>
            <li>
              <a href="/profile" className="text-blue-500">
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
