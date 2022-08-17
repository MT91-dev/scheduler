# Interview Scheduler Web Application
## Project Description

Hello everyone and welcome to Interview Scheduler, which is a Single Page Application (SPA) for organizing & tracking a students interviews on any given day of the week! The application has been built with the latest tools including React which a powerful front-end framework, to provide the user with a dynamic and seamless experience.
The App utilizes React's built-in and custom hooks to allow for a user to add, edit and delete their appointments in real time.
The data utilized by the app is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP protocols using CRUD/BREAD operations, with API responses with the widely used JSON format.
For quality and robustness of the application, the testing has follows best practices outlined by the Test Driven Development methods (TDD). The testing conducted included unit and integration testing of components in isolation using the Jest library, followed by end-to-end testing performed using Cypress.

## Project Features
- The landing page showcases the appointment days (i.e. Monday to Friday) which are displayed and color-coded to indicate selection as well as availability on any day.
- Below the days displayed, there is a small snapshot of the available spots for interviews on that day which updates in real time after any changes to the appointment state.
- A user can book an interview by typing in their name and selecting an interviewer from a list, followed by saving the appointment.
- A user is able to switch between any of the days, view the available (if any) appointment spots, book an appointment, cancel an existing appointment by pressing the trash icon, as well as edit an existing appointment with updated information such as name and interviewer by clicking the edit icon.
- When a user wants to cancel an appointment or edit an existing appointment, a confirmation box wil appear to ensure their action is verified prior to execution.


### Home Page
!['home-page'](https://github.com/MT91-dev/scheduler/blob/master/docs/Home%20Page.png?raw=true)
_The user can select a day of the week as seen on the left panel, which will update the right side and showcase all appointments that are booked/spots that are available that day for booking._


### Booking New Interview Appointment
!['booking-new-appointment'](https://github.com/MT91-dev/scheduler/blob/master/docs/Creating%20New%20Appointment.png?raw=true)
_A user can add an interview appointment to any selected day where there are spots available for an appointment. This is done by selecting the day and inputting a name and picking an interviewer prior to confirming._


### Cancelling An Existing Interview Appointment with Confirmation Prompt
!['cancel-appointment-confirm-delete'](https://github.com/MT91-dev/scheduler/blob/master/docs/Confirmation%20on%20Delete.png?raw=true)
_A user can cancel an existing appointment by pressing the trash (delete) icon and interacting with the confirmation prompt prior to executing the cancellation._

### Showcasing Spots Remaining On Fully Filled Schedule
!['full-schedule-no-spots-remaining'](https://github.com/MT91-dev/scheduler/blob/master/docs/Completely%20Full%20Schedule.png?raw=true)
_Once all the available spots in the week are filled, the user can see the booked appointments and visually see that each day has a higher opacity and the spots remaining are 0 for each day._

**Note** : _For full functionality of the web application, both of the client and the API server applications must run concurrently (please see below for database* setup)._


## Installing Dependencies
```
npm install
```

## Running Webpack Development Server
```
npm start
```

## Running Jest Test Framework
```
npm test
```

## Running Storybook Visual Testbed
```
npm run storybook
```

## API server/*Database Setup

Please ensure that both the client and API server applications are run concurrently for full web application funcitionality.
- Start by forking & cloning the scheduler-api server which can be found on GitHub [here](https://github.com/lighthouse-labs/scheduler-api)
- Follow the steps outlined in the scheduler-api README to install and setup the database, especially the instructions for resetting the database
- After the API server has been setup, fork and clone this repository
- Navigate to the root directory and install the dependencies with the command `npm install`
- Once you have the database setup and the scheduler-api server is running and dependencies installed in the root directory, run the following command from the root directory of the project `npm start` to launch the scheduler web application!

## Project Stack

__Front-End:__ JavaScript, HTML, JSX, React, Axios, SASS

__Back-End:__ Express, Node.js, PostgreSQL

__Testing:__ Storybook, Webpack Dev Server, Jest, Testing Library and Cypress

## Dependencies
- Axios
- Babel-loader
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts
- Babel/core
- Storybook/addon-actions
- Storybook/addon-backgrounds
- Storybook/addon-links
- Storybook/addons
- Storybook/react
- Testing-library/jest-dom
- Testing-library/react
- Testing-library/react-hooks
- Prop-types
- React-test-renderer
- Node-sass