
# GreenHabits

GreenHabits is a habit-tracking application designed to encourage eco-friendly choices in daily life. Users can track sustainable habits, participate in monthly challenges, and monitor their environmental impact over time.




## Features

- Track daily, weekly, and monthly eco-friendly habits
- Join rotating monthly challenges
- View progress summaries, including CO₂ savings and habit streaks
- Receive reminders for habit completion
- Explore sustainability tips and facts


## Tech Stack

**Client:** Vite, React, TypeScript, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB Atlas

**Testing:**
- Unit testing: Vitest
- E2E testing: Cypress




## Deployment

GreenHabits is deployed on Vercel for seamless hosting and continuous integration. Every push to the main branch triggers a deployment.

https://green-habit-tracker-frontend.vercel.app/


## Usage
- Sign up and log in to start tracking your eco-friendly habits.
- Click Add Habit to select and customize habits based on frequency.
- Join monthly challenges and earn points.
- Monitor your impact through the progress summary section.
- Access the Eco-tip of the day and explore sustainability facts.


## Installation

To run GreenHabits locally, follow these steps:

1. Clone the repository: 

```
https://github.com/DiemBang/green-habit-tracker
cd green-habit-tracker
```

### Backend

1. Go to backend directory

```
cd backend
```

2. Install dependencies:
```
npm Install
```

3. Set up environment variables (create a .env file and configure necessary keys):

```
MONGO_ROOT_USERNAME="<username>"
MONGO_ROOT_PASSWORD="<password>"
MONGO_URL="<mongo database url>"
```

4. (OPTIONAL) Start up a local mongo development database server by running

```
docker-compose up -d
```


4. Start the development server:
```
npm run dev
```

### Frontend

1. Go to frontend directory

```
cd green-habit-tracker-frontend
```

2. Install dependencies:
```
npm Install
```

3. Set up environment variables (create a .env file and configure necessary keys):

```
VITE_BACKEND_BASE_URL="http://localhost:3000"
CORS_ORIGIN=http://localhost:5173
```

4. Start the development server:
```
npm run dev
```

Now you should be able to go to `http://localhost:5173/` in your browser to login or create a user.
## Running Tests

To run tests, go to frontend directory

```cd green-habit-tracker-frontend```

and run the following commands

- Unit Tests (Vitest):
```
npm run test
```
- End-to-End Tests (Cypress):
```
npm run cypress:open
```
