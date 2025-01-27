import axios from "axios";
import { IUserHabitCompleted } from "../../models/IUserHabitCompleted";
import { getUserHabitsCompleted } from "../../services/userHabitCompletedService";
import { describe, it, expect, vi, Mocked } from "vitest";

vi.mock("axios");

const mockedAxios = axios as Mocked<typeof axios>;

describe("getUserHabitsCompleted", () => {
  const BASE_URL = `${
    import.meta.env.VITE_BACKEND_BASE_URL
  }/api/userHabitsCompleted`;

  const mockData: IUserHabitCompleted = {
    _id: "12345",
    dateCompleted: new Date("2025-01-27"),
    habitIdentifier: "habit-123",
    userHabitID: "userHabit-456",
    name: "Drink Water",
    userID: "user-789",
  };

  it("fetches and returns user habits completed data in the correct format", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: mockData });

    const userID = "user-789";
    const result = await getUserHabitsCompleted(userID);

    expect(mockedAxios.post).toHaveBeenCalledWith(BASE_URL, { userID });
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockData);
    expect(result).toMatchObject({
      _id: expect.any(String),
      dateCompleted: expect.any(Date),
      habitIdentifier: expect.any(String),
      userHabitID: expect.any(String),
      name: expect.any(String),
      userID: expect.any(String),
    });
  });
});
