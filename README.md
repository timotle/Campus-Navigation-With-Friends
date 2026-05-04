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
3. Add at least two classes to the schedule.
4. Click Save.
5. Use the "Show path at" dropdown on the map to choose the time between classes.
6. The app will draw the walking route on the campus map.

The path feature needs at least two classes because it is showing where the student walks from one class to the next.

## How It Works

Users input their class schedule, and the app calculates walking paths between locations. It also compares routes between users and finds the closest points between them using a tree-based algorithm instead of checking every possible pair.

The friend feature works best when multiple users have saved schedules. If two users are walking around the same time, the app can show where they may be close to each other.

## Notes

This is a class project/demo, so the UI is simple. The deployed version does not use a database yet, so saved schedules and friends may reset sometimes on Vercel.

## What I Learned

I learned how to build a full-stack app and connect a frontend to a backend. I also implemented a more efficient algorithm to reduce unnecessary comparisons and improve performance.
