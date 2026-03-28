# Campus Navigation With Friends

**Overview**
This is a full-stack web app I built that helps students find the best path across campus while also showing which friends will be nearby based on their schedules.

**Features**
- Find shortest paths between campus locations
- Show routes visually on a map
- Detect nearby friends walking at the same time
- Display closest meeting points between users

**Tech Stack**
- TypeScript
- React
- Node.js
- HTML/CSS

**How It Works**
Users input their class schedule, and the app calculates walking paths between locations. It then compares routes between users and finds the closest points between them using a tree-based algorithm, instead of checking every possible pair.

**How to Run**
1. Clone the repo  
2. Go into /client and /server  
3. Run: npm install  
4. Run: npm start in both folders  
5. Open http://localhost:8080  

**What I Learned**
I learned how to build a full-stack app and connect a frontend to a backend. I also implemented a more efficient algorithm to reduce unnecessary comparisons and improved performance.
