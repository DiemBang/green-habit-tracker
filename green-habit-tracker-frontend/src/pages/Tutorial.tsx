import { useState } from "react";

export const Tutorial = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const tutorialContent: Record<string, JSX.Element> = {
    Home: (
      <>
        {/* Mobile-specific text */}
        <div className="block lg:hidden">
          <p className="mb-2">The Home page is your daily hub!</p>
          <ul className="list-disc list-inside">
            <li>
              Track today's habits: See what eco-friendly habits you need to
              complete today.
            </li>
            <li>
              Add habits: Click "Add Habit" to expand your list of eco-friendly
              habits.
            </li>
            <li>
              Explore categories: View habits by category when you click on "Add
              Habit."
            </li>
            <li>
              Detailed habit info: Select a habit to:
              <ul className="list-[circle] list-inside ml-6">
                <li>Learn more about it.</li>
                <li>See how much CO₂ you’ll save.</li>
                <li>Check how many points you’ll earn by completing it.</li>
                <li>Choose a frequency (daily, weekly, etc.).</li>
                <li>Set a reminder time to stay on track.</li>
              </ul>
            </li>
            <li>
              Use the calendar: Select any date to view or plan your habits for
              that day.
            </li>
            <li>
              Sustainable fact of the day: Get inspired with a daily
              sustainability fact.
            </li>
          </ul>
        </div>
        {/* Desktop-specific text */}
        <div className="hidden lg:block">
          <p className="mb-2">The Dashboard is your daily hub!</p>
          <ul className="list-disc list-inside">
            <li>
              Track today's habits: See what eco-friendly habits you need to
              complete today.
            </li>
            <li>
              Add habits: Click "Add Habit" to expand your list of eco-friendly
              habits.
            </li>
            <li>
              Explore categories: View habits by category when you click on "Add
              Habit."
            </li>
            <li>
              Detailed habit info: Select a habit to:
              <ul className="list-[circle] list-inside ml-6">
                <li>Learn more about it.</li>
                <li>See how much CO₂ you’ll save.</li>
                <li>Check how many points you’ll earn by completing it.</li>
                <li>Choose a frequency (daily, weekly, etc.).</li>
                <li>Set a reminder time to stay on track.</li>
              </ul>
            </li>
            <li>
              Use the calendar: Select any date to view or plan your habits for
              that day.
            </li>
            <li>
              Sustainable fact of the day: Get inspired with a daily
              sustainability fact.
            </li>
          </ul>
        </div>
      </>
    ),
    Explore: (
      <>
        <p className="mb-2">The Explore page is where you find inspiration:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            Monthly challenges: Try eco-friendly challenges tailored to make a
            difference. The challenges change every month, so take the
            opportunity to join them when you see them.
          </li>
          <li>
            Read more about challenges: Click on a challenge to learn more about
            it.
          </li>
          <li>
            Join challenges: When you click "Join," the habit will be added to
            your habit list on the Home page.
          </li>
          <li>
            Earn points for completion: Points for completing the challenge will
            be added to your profile once the challenge is completed.
          </li>
          <li>
            Leave challenges: If the challenge is still available, you can leave
            it by clicking the "Leave" button.
          </li>
          <li>
            Eco-tip of the day: Learn practical tips to live more sustainably.
          </li>
        </ul>
      </>
    ),
    Profile: (
      <>
        {/* Mobile-specific text */}
        <div className="block lg:hidden">
          <p className="mb-2">
            The Profile page is all about tracking your progress:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              See your achievements: View completed challenges and earned
              badges.
            </li>
            <li>
              Track your impact: Discover how your habits contribute to a
              greener planet.
            </li>
            <li>
              Access settings: From the Profile page, access settings to:
              <ul className="list-[circle] list-inside ml-6">
                <li>Turn on notifications.</li>
                <li>Read the "About Us" page.</li>
                <li>Revisit the tutorial.</li>
              </ul>
            </li>
          </ul>
        </div>
        {/* Desktop-specific text */}
        <div className="hidden lg:block">
          <p className="mb-2">
            The Profile page is all about tracking your progress:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              See your achievements: View completed challenges and earned
              badges.
            </li>
            <li>
              Track your impact: Discover how your habits contribute to a
              greener planet.
            </li>
          </ul>
        </div>
      </>
    ),
  };

  return (
    <>
      <h3>Tutorial</h3>

      {["Home", "Explore", "Profile"].map((section) => (
        <section
          key={section}
          className="m-2 lg:m-6 bg-cloudWhite border rounded-lg shadow-sm"
        >
          <button
            className="flex justify-between items-center w-full px-4 py-3 bg-cloudWhite font-medium text-lg focus:outline-none hover:bg-gray-200 transition duration-300"
            onClick={() => toggleSection(section)}
          >
            {/* Responsive Heading */}
            <span className="text-left">
              {section === "Home" ? (
                <>
                  <span className="block lg:hidden">Home</span>
                  <span className="hidden lg:block">Dashboard</span>
                </>
              ) : (
                section
              )}
            </span>
            <span
              className={`transform transition-transform duration-300 ${
                openSection === section ? "rotate-180" : ""
              }`}
            >
              🌿
            </span>
          </button>
          {openSection === section && (
            <div className="p-4 bg-white">{tutorialContent[section]}</div>
          )}
        </section>
      ))}
    </>
  );
};
