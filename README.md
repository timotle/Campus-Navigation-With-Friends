# Campus Navigation With Friends

## Live App

You can try the project here:

https://campus-navigation-with-friends.vercel.app/

## Overview

Campus Navigation With Friends is a full-stack web app I built for a class project. It helps students find walking paths across campus and see which friends may be nearby based on their schedules.

## Features

- Choose a user and create a class schedule
- Find the shortest walking path between campus buildings
- Show the route visually on a UW campus map
- Add friends and compare schedules
- Detect nearby friends walking at the same time
- Display closest meeting points between users

## Languages/Tools/Frameworks

- TypeScript
- React
- Node.js
- Express
- Vercel
- HTML/CSS

## How To Use It

1. Open the live app.
2. Choose a user from the login dropdown.
3. Add a class by choosing the time, choosing the building, typing the class name, and clicking Add.
4. The "named" box is where you type the class name, like CSE 331, Math, or any label you want for that class.
5. Add at least two classes to the schedule.
6. Click Save so the app stores the schedule before showing paths.
7. Use the "Show path at" dropdown on the map to choose the time between classes.
8. The app will draw the walking route on the campus map.

The path feature needs at least two classes because it is showing where the student walks from one class to the next.

The Save button is important because it stores the schedule and friend choices for the selected user. After saving, the map can use that schedule to calculate routes.

The Go Back to Login button takes you back to the user dropdown. This lets you switch to another user, add their schedule, and then compare friends.

The friends section lets you mark which users are friends with the current user. If a friend also has a saved schedule and they are walking during the same time, the app can show where that friend is nearby on the route.

## How It Works

Users input their class schedule, and the app calculates walking paths between locations. It also compares routes between users and finds the closest points between them using a tree-based algorithm instead of checking every possible pair.

The friend feature works best when multiple users have saved schedules. If two users are walking around the same time, the app can show where they may be close to each other.

## What I Learned

I learned how to build a full-stack app and connect a frontend to a backend. I also implemented a more efficient algorithm to reduce unnecessary comparisons and improve performance.
