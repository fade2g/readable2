This is my submission project for Udacity's React Redux course for the "Readable" project.
  
## Installation

Installation is done with npm or yarn. To install all required dependencies, type in the console:

`npm install`

or

`yarn install`

This will start the live reload server and open the app in the browser. The URL is displayed in the command prompt as well. 

## Embedded backend server
The provided backend server has been "embedded" into this project. It is based on the specifc commit of
[reactnd-project-readable-starter](https://github.com/udacity/reactnd-project-readable-starter/commit/c4a8fca02aa64a34601b6a737663483dee130893)

The issue [Bug in posts.js - Not filtering out deleted posts](https://github.com/udacity/reactnd-project-readable-starter/issues/7) has been resolved in the embedded version.

The embedded server runs on port 3001.

Installation is done together with installation of the react project (as it shares the package.json file).

Starting the server:

`npm run start-server`


## Start
To start the frontend server for the app, type in the console:

`npm start`

or

`yarn start`

The application will launch by default on port `3000`, so it will be available under http://localhost:3000/

As a convenience feature, the backend server and the frontend application can be started together with the following command:

`npm run start-all`

**Note**: Two command promps will be opened (this has been tested on a windows machine)  

## Optional: Installation of Backend Server

This project requires a separate installation of a backend server. The backend server is available as a separate installation here:

https://github.com/fade2g/reactnd-project-readable-starter

In order to start the backend, the following instructions apply:

1. clone or download the server repository
1. `yarn install` or `npm install` to install the depenedncies
1. `yarn start` or `node server.js` to start the backend server

by default, the server will run on port `3001`. This is **exepected from the readable frontend application** as well.

The backend server has been minimally modified from the original clone available from here: https://github.com/udacity/reactnd-project-readable-starter  As ist cannot be controlled that the "public" server API will stay in sync with the server API expected from the frontend application, it is recommended to use the forked backend server. 

