import { CardSection } from "../components/CardSection";

export const About = () => {
  return (
    <>
      <h1>About GreenHabits</h1>
      <CardSection className="mb-20">
        <p className="mb-4">
          GreenHabits is a passion project born from my final-year degree work,
          inspired by my internship at a greentech data company. During my time
          there, I saw firsthand how data-driven insights can help people make
          more sustainable choices. This experience led me to create
          GreenHabits—an app designed to make eco-friendly living easy,
          engaging, and rewarding.
        </p>
        <p className="mb-4">
          With GreenHabits, you can track small everyday actions that add up to
          a big impact. Whether it's reducing food waste, choosing sustainable
          transport, or joining monthly challenges, the app helps you stay
          consistent with green habits. You'll also get real-time insights, like
          CO₂ savings per action, and earn points as you progress.
        </p>
        <p className="mb-4">
          My goal with GreenHabits is to empower individuals to make sustainable
          choices every day. By turning eco-friendly actions into a fun and
          trackable habit, we hope to inspire a greener lifestyle—one step at a
          time.
        </p>
        <p className="mb-4">Ready to make every choice count? 🌱🌍✨</p>
      </CardSection>
    </>
  );
};
