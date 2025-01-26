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
  const searchParams = new URLSearchParams(location.search);
  const previous = searchParams.get("previous");

  // Handle the "previous=home" case
  if (previous === "home") {
    return { showBackIcon: true, backText: "Home" };
  }

  // Match dynamic paths
  if (path.startsWith("/habit/")) {
    return backIconConfig["/habit/*"];
  }

  if (path.startsWith("/challenge/")) {
    return backIconConfig["/challenge/*"];
  }

  // Default case
  return backIconConfig[path] || { showBackIcon: false, backText: "" };
};
