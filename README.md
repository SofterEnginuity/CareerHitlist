# Sprint 2: Hitlist

<img src="https://imgur.com/0MkFIDf" height="40%" width="40%">

## How It's Made:
HTML, CSS, Javascript, Node, REST API, JSON for backend server

1. Companies should be saved in JSON Server.
-Data is stored in db.json and managed via RESTful API calls.
-Implemented a form to submit new company entries and save them to db.
2. Each company entry should have a delete button to delete companies.
-Use window.confirm() to ask for deletion confirmation before removing from db.
3. User should be able to filter companies based on criteria (e.g., priority, location, or name).
-Can search by location or company name and filters in real time.
4. Implement error handling for at least one API request.
-Empty/invalid entries as well as duplicates will throw an error.




## Lessons Learned:
I got hands-on experience with React and JSON Server, learning how to manage state, handle API requests, and debug data updates. Troubleshooting was tricky, but it made the connection between frontend and backend clearer. 


## Installation/Usage
1. Clone repo
2. run `npm install`
3. run `node server.js`
4. Navigate to `localhost:5173`
5. Open new terminal, run `npx json-server --watch db.json --port 3001`
6. Navigate to `localhost:3001/companies`

