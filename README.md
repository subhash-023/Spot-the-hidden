
# Spot-the-hidden - A Photo Tagging App

This project is a web-based photo tagging game inspired by the classic "Where's Waldo?" books. Users are shown a large, detailed image and must find and tag specific characters hidden within it. The application features Interactive image-tagging, a real-time game timer, and a leaderboard to record the fastest times.

This is a full-stack application built as part of [The Odin Project's](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app) curriculum.

**Live Demo**: https://spot-the-hidden.netlify.app/

## **Features**

**Interactive Image Tagging**: Click anywhere on the image to bring up a targeting box and a dropdown menu of characters to find.

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

Frontend: Netflify

Backend(Server and database): Render

## **How It Works**

1.  **Load the Level:** When you open a level, the application first fetches all the necessary data. This includes the main image for the puzzle and the coordinates of the items you need to find.

2.  **Start the timer:** You are shown which items to look for. As soon as you hit the "Start" button, a timer starts.

3.  **Find and Select:** You click on the spot in the main image where you think an item is hidden. A small menu appears right where you clicked, letting you select which of the target items you believe you've found.

4.  **Check for a Match:** The application checks if your chosen item is actually located at the coordinates you clicked. If you're right, the item is marked as "found." If not, you can try again.

5.  **Win and Submit Score:** Once you have successfully found all the items, the timer stops. A victory screen appears showing your final time. You can then enter your name to save your score to the level's leaderboard before being taken to see the rankings.
