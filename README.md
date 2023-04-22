# VisualizationDashboard

## Versions and Dependencies

```bash
$ node -v
v18.16.0

$ npm -v
9.5.1
```

### Server

```json
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "mongoose": "^7.0.4"
  },
```

### Client

```json
"dependencies": {
    "@reduxjs/toolkit": "^1.9.5",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.3.5",
    "chart.js": "^4.2.1",
    "react": "^18.2.0",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.0.5",
    "react-router": "^6.10.0",
    "react-router-dom": "^6.10.0",
    "react-scripts": "5.0.1",
    "react-tooltip": "^5.11.1",
    "web-vitals": "^2.1.4"
  },
```

## How to run

```bash
git clone https://github.com/AyushBobale/VisualizationDashboard.git
cd VisualizationDashboard
# Server
cd source/server
node index.js
# Client execute in another terminal
cd source/client
npm start

# Or
npm run build
npx serve build -s
```
