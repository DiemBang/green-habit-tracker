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
              Habits to complete list - Track today's habits: See what
              eco-friendly habits you need to complete today.
              <ul className="list-[circle] list-inside ml-6">
                <li>Click a habit to read more or remove it from the list.</li>
                <li>See the selected frequency: daily, weekly, or monthly.</li>
                <li>
                  For weekly and monthly habits, the last completed day is
                  shown. If the habit was completed within the last 7 or 30
                  days, it will be marked as completed, and the radio button
                  will be inactive until it's time to complete it again.
                </li>
              </ul>
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
              Use the calendar: Select any date to view your habits for that
              day. <strong>Note:</strong> You can only mark habits as completed
              on the current date (today), not past or future dates.
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
              Habits to complete list - Track today's habits: See what
              eco-friendly habits you need to complete today.
              <ul className="list-[circle] list-inside ml-6">
                <li>Click a habit to read more or remove it from the list.</li>
                <li>See the selected frequency: daily, weekly, or monthly.</li>
                <li>
                  For weekly and monthly habits, the last completed day is
                  shown. If the habit was completed within the last 7 or 30
                  days, it will be marked as completed, and the radio button
                  will be inactive until it's time to complete it again.
                </li>
              </ul>
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
              Use the calendar: Select any date to view your habits for that
              day. <strong>Note:</strong> You can only mark habits as completed
              on the current date (today), not past or future dates.
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
            Challenge icon: Once a habit is added from a challenge, a challenge
            icon will appear next to it, indicating that it is part of the
            monthly challenge.
          </li>
          <li>
            Earn points for completion: Points for completing the challenge will
            be added to your profile once the challenge is completed.
          </li>
          <li>
            Habit stays after challenge completion: When you complete a
            challenge, the habit will remain on your list as a daily habit
            unless you choose to remove it.
          </li>
          <li>
            Leave challenges: You can choose to leave a challenge by:
            <ul className="list-[circle] list-inside ml-6">
              <li>
                Find the challenge on the Explore page and click the "Leave"
                button on the challenge page.
              </li>
              <li>
                Clicking the challenge icon in your Habits to complete list.
              </li>
            </ul>
            <strong>⚠ Note:</strong> If the monthly challenges have changed and
            are no longer available on the Explore page, you may not be able to
            re-join the same challenge.
          </li>
          <li>
            Eco-tip of the day: Learn practical tips to live more sustainably.
          </li>
        </ul>
      </>
    ),
    Progress: (
      <>
        <p className="mb-2">
          The Progress Summary page gives you insights into your eco-friendly
          habits.
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            Time Period Selection: At the top of the summary, you can choose a
            time period—Week, Month, or Year—to view your progress over
            different durations. Simply select your preferred timeframe from the
            dropdown menu, and your stats will update accordingly.
          </li>
          <li>
            The Streaks section tracks:
            <ul className="list-[circle] list-inside ml-6">
              <li>
                Longest Streak – The most consecutive days you’ve completed at
                least one habit.
              </li>
              <li>
                Current Streak – The number of consecutive days you’ve
                maintained your sustainable habits.
              </li>
            </ul>
            Keep up your streaks to build a lasting green routine!
          </li>
          <li>
            The Habit Summary gives an insight into your overall habit
            completion: Total Completed – The total number of habits you’ve
            successfully tracked. Top Habits Completed – A list of the habits
            you’ve completed the most. This section helps you identify your
            strongest eco-friendly habits and encourages you to diversify your
            sustainable actions.
          </li>
          <li>
            The CO₂ Savings section displays: Total CO₂ Saved – The amount of
            CO₂ emissions you have prevented by completing your tracked habits.
            Every small action adds up! Keep tracking your habits to see your
            impact grow over time.
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
          </ul>
        </div>
      </>
    ),
  };

  return (
    <>
      <h1 className="ml-5">Tutorial</h1>
      <div className="mb-20">
        {["Home", "Explore"].map((section) => (
          <section
            key={section}
            className="m-2 lg:m-6 bg-cardWhite border rounded-lg shadow-sm"
          >
            <button
              className="flex justify-between items-center w-full px-4 py-3 bg-cardWhite font-medium text-lg focus:outline-none hover:bg-headerAndFooterColor transition duration-300"
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

        {/* Progress Summary - Only displayed on large screens and above Profile */}
        <div className="hidden lg:block">
          <section className="m-2 lg:m-6 bg-cardWhite border rounded-lg shadow-sm">
            <button
              className="flex justify-between items-center w-full px-4 py-3 bg-cardWhite font-medium text-lg focus:outline-none hover:bg-headerAndFooterColor transition duration-300"
              onClick={() => toggleSection("Progress")}
            >
              <span className="text-left">Progress</span>
              <span
                className={`transform transition-transform duration-300 ${
                  openSection === "Progress" ? "rotate-180" : ""
                }`}
              >
                🌿
              </span>
            </button>
            {openSection === "Progress" && (
              <div className="p-4 bg-white">{tutorialContent["Progress"]}</div>
            )}
          </section>
        </div>

        {/* Profile Section (Appears Below Progress) */}
        <section className="m-2 lg:m-6 bg-cardWhite border rounded-lg shadow-sm">
          <button
            className="flex justify-between items-center w-full px-4 py-3 bg-cardWhite font-medium text-lg focus:outline-none hover:bg-headerAndFooterColor transition duration-300"
            onClick={() => toggleSection("Profile")}
          >
            <span className="text-left">Profile</span>
            <span
              className={`transform transition-transform duration-300 ${
                openSection === "Profile" ? "rotate-180" : ""
              }`}
            >
              🌿
            </span>
          </button>
          {openSection === "Profile" && (
            <div className="p-4 bg-white">{tutorialContent["Profile"]}</div>
          )}
        </section>
      </div>
    </>
  );
};
