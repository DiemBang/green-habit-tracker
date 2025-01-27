import { describe, it, expect, vi, Mock } from "vitest";

// Mock the entire module
vi.mock(import("../../services/userHabitService"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getUserHabits: vi.fn(), // Mock getUserHabits specifically
  };
});
import * as userHabitService from "../../services/userHabitService"; // Import the whole module
import { checkIfHabitAlreadyAdded } from "../../utils/userHabitUtils";

describe("checkIfHabitAlreadyAdded", () => {
  it("should return true if the habit is already added", async () => {
    // Arrange
    const habitIdentifier = "habit-1";
    const userID = "user-123";
    const mockHabits = [
      {
        _id: "1",
        dateStarted: "2023-01-01",
        frequency: "daily",
        habitIdentifier: "habit-1",
        reminderTime: "08:00",
        userID: "user-123",
        name: "Test Habit",
        completedToday: false,
        lastCompletedDate: "2025-01-25",
      },
      {
        _id: "2",
        dateStarted: "2023-01-02",
        frequency: "weekly",
        habitIdentifier: "habit-2",
        reminderTime: "10:00",
        userID: "user-123",
        name: "Another Habit",
        completedToday: false,
        lastCompletedDate: "2025-01-26",
      },
    ];

    (userHabitService.getUserHabits as Mock).mockResolvedValue(mockHabits);

    // Act
    const result = await checkIfHabitAlreadyAdded(habitIdentifier, userID);

    // Assert
    expect(result).toBe(true);
    expect(userHabitService.getUserHabits).toHaveBeenCalledWith(userID);
  });

  it("should return false if the habit is not added", async () => {
    // Arrange
    const habitIdentifier = "habit-3";
    const userID = "user-123";
    const mockHabits = [
      {
        _id: "1",
        dateStarted: "2023-01-01",
        frequency: "daily",
        habitIdentifier: "habit-1",
        reminderTime: "08:00",
        userID: "user-123",
        name: "Test Habit",
        completedToday: false,
        lastCompletedDate: "2025-01-25",
      },
      {
        _id: "2",
        dateStarted: "2023-01-02",
        frequency: "weekly",
        habitIdentifier: "habit-2",
        reminderTime: "10:00",
        userID: "user-123",
        name: "Another Habit",
        completedToday: false,
        lastCompletedDate: "2025-01-26",
      },
    ];

    (userHabitService.getUserHabits as Mock).mockResolvedValue(mockHabits); // Cast to vi.Mock

    // Act
    const result = await checkIfHabitAlreadyAdded(habitIdentifier, userID);

    // Assert
    expect(result).toBe(false);
    expect(userHabitService.getUserHabits).toHaveBeenCalledWith(userID);
  });

  it("should handle an empty list of habits and return false", async () => {
    // Arrange
    const habitIdentifier = "habit-3";
    const userID = "user-123";

    (userHabitService.getUserHabits as Mock).mockResolvedValue([]); // Cast to vi.Mock

    // Act
    const result = await checkIfHabitAlreadyAdded(habitIdentifier, userID);

    // Assert
    expect(result).toBe(false);
    expect(userHabitService.getUserHabits).toHaveBeenCalledWith(userID);
  });
});
