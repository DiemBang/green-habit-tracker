import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  (async () => {
    try {
      const authHeader: string | undefined = req.cookies.authToken;

      if (!authHeader) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" });
      }

      const token: string = authHeader;

      // Get database instance from req.app.locals
      const db = req.app.locals.db;
      const usersCollection = db.collection("User");

      // Find user by token
      const user = await usersCollection.findOne({ userToken: token });

      if (!user) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }

      next(); // Proceed to the next middleware
    } catch (error) {
      console.error("Error in authMiddleware:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  })();
};
