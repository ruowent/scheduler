<div align="center">
<h1>
<a href="https://ruowent-interview-scheduler.netlify.app/">
<img src="public/images/logo.png" alt="Interview Scheduler" />
<a>
</h1>

[![CircleCI Build Status](https://circleci.com/gh/ruowent/scheduler.svg?style=shield)](https://circleci.com/gh/ruowent/scheduler)

<b><a href="https://ruowent-interview-scheduler.netlify.app/" target="_blank">
   Check out my app here
</a></b>
<p>(Please allow 20 seconds for Heroku to initialize)</p>
</div>

## 📖 Introduction

Scheudler is a full-stack, single-page React application that allows users to book and cancel interviews. Real-time interview schedules are updated via Websocket.

## 🖥 Tech Stack
<b>Development</b>: ReactJS, CSS/SASS, Node.js, Express, PostgreSQL<br />
<b>Tools & Testing</b>: Storybook, Jest, Cypress<br />
<b>Deployment</b>: Heroku (database API), CircleCI (continuous integration), Netlify (production client)

## 🎥 Demo
![Book/Edit/Delete Appoinement](https://github.com/ruowent/scheduler/blob/master/public/images/scheduler.gif?raw=true)

## 🛠 Setup
The project is live [here](https://ruowent-interview-scheduler.netlify.app/), but if you would prefer a local installation:

1. Fork or download this repository

2. Set up and run the scheduler API server

- Follow [README](https://github.com/ruowent/scheduler-api)

3. Install dependencies with 

```sh
npm install
```

4. Running Webpack Development Server

```sh
npm start
```
## ✅ Tools & Testing (Storybook, Jest, Cypress)

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```
### Run the Cypress test runner
```sh
npm run cypress
```