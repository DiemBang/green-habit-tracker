interface BackIconConfig {
  showBackIcon: boolean;
  backText: string;
}

const backIconConfig: Record<string, BackIconConfig> = {
  "/categories": { showBackIcon: true, backText: "Home" },
  "/habitsPerCategory/Home": {
    showBackIcon: true,
    backText: "Categories",
  },
  "/habitsPerCategory/Food": {
    showBackIcon: true,
    backText: "Categories",
  },
  "/habitsPerCategory/On-the-go": {
    showBackIcon: true,
    backText: "Categories",
  },
  "/habitsPerCategory/Work": {
    showBackIcon: true,
    backText: "Categories",
  },
  "/habitsPerCategory/All": {
    showBackIcon: true,
    backText: "Categories",
  },
  "/habit/*": { showBackIcon: true, backText: "Category" },
  "/challenge/*": { showBackIcon: true, backText: "Explore" },
  "/settings": { showBackIcon: true, backText: "Profile" },
  "/progress-summary": { showBackIcon: true, backText: "Profile" },
  "/notifications-settings": { showBackIcon: true, backText: "Settings" },
  "/about": { showBackIcon: true, backText: "Settings" },
  "/tutorial": { showBackIcon: true, backText: "Settings" },
  // Add more pages as needed
};

export const getBackIconConfig = (path: string): BackIconConfig => {
  if (path.startsWith("/habit/")) {
    return backIconConfig["/habit/*"];
  }

  if (path.startsWith("/challenge/")) {
    return backIconConfig["/challenge/*"];
  }

  return backIconConfig[path] || { showBackIcon: false, backText: "" };
};
