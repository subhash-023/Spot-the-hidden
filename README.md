
# Spot-the-hidden - A Photo Tagging App

This project is a web-based photo tagging game inspired by the classic "Where's Waldo?" books. Users are shown a large, detailed image and must find and tag specific characters hidden within it. The application features a server-side validation system, a real-time game timer, and a leaderboard to record the fastest times.

This is a full-stack application built as part of [The Odin Project's](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app) curriculum.

Live Demo: 

(Replace the placeholder above with a screenshot of your actual application)

## **Features**

**Interactive Image Tagging**: Click anywhere on the image to bring up a targeting box and a dropdown menu of characters to find.

**Server-Side Validation**: Character selections are validated on the backend to see if the user's click is within the correct coordinates. This prevents client-side cheating.

**Real-time Feedback**: Users receive instant feedback on whether their selection was correct or not.

**Character Markers**: Correctly identified characters are marked on the image, showing the user's progress.

**Game Timer**: A timer starts as soon as the game begins and stops once all characters have been successfully found.

**High Score Leaderboard**: After completing the game, players can submit their name to a leaderboard to see how they stack up against others.

**Responsive Coordinate System**: The click detection logic normalizes coordinates, ensuring the game works correctly across different screen sizes.

## **Tech Stack**
This project was built using the following technologies:

**Frontend**:

React.js

**Backend**:

Node.js with Express.js

PostgreSQL

**Deployment**:

Vercel / Netlify / Heroku

## **How It Works**

The application's logic is separated between the frontend and backend to ensure a secure and responsive experience:

**Game Start**: When the page loads, the frontend fetches the game image and starts a timer on the server, associating it with a unique session ID.

**User Interaction**: When a user clicks on the image, the frontend calculates the relative (x, y) coordinates of the click as a percentage of the image's total dimensions. This ensures the coordinates are consistent regardless of the user's screen size.

**API Call**: The frontend sends the character name selected by the user and the calculated coordinates to a backend API endpoint for validation.

**Backend Validation**: The server receives the request and queries the database. It checks if the submitted coordinates fall within the pre-defined bounding box stored for that specific character.

**Feedback Loop**: The server responds with whether the selection was true (correct) or false (incorrect). The frontend then displays the appropriate message to the user and, if correct, places a permanent marker on the image.

**Game End**: Once all characters are found, the server stops the timer and the final time is sent to the user. They are then prompted to enter their name for the leaderboard.