# myFlix Client

The myFlix Client ist a React-based frontend for the Movie API created in another Repository. Combined, they form the fully functional myFlix application where users can sign up and interact with a given set of movies.
![Log-In Page of myFlix Client](https://daniswhoiam.github.io/portfolio-website/img/myflix.png)
#### Table of Contents

- [Objective](#Objective)
- [User Goals](#User-Goals)
- [Key Features](#Key-Features)
- [Stack](#Stack)
- [How to Use](#How-to-Use)

## Objective
This project is intended as a first time implementation of a client-side of an application using React. The goal was also to build a single-page application (SPA), learn about building processes (Create React App was used) and become familiar with the Flux pattern (React Redux was implemented).

## User Stories

 - As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
 - As a user, I want to be able to create a profile so I can save data about my favorite movies.


## Key Features

 - Allow users to register (username, password, email, birthday)
 - Allow users to log in with a username and a password
 - Allow users to update their user info
 - Allow existing users to deregister
 - Return a list of all movies to the user (each listed with an image, title, and description)
 - Sort and filter movies
 - Select a movie and show more information about it
 - Allow users to add or remove a movie to their list of favorites
 - Show data about genres with name and description
 - Show data about directors with name, bio, birth year, death year

## Stack

 - React
 - React Redux
 - Redux Thunk
 - React Bootstrap
 - CRA (Create React App)
 - Netlify

## How to Use
### Live Website
[Click here for the live version of the application](https://daniswhoiam-myflix.netlify.app/)
### For Development
Clone the code to your local machine following GitHub's instructions.

Run `npm install` to install all necessary dependencies.

To run the application locally, run `npm start` in your project folder and open [http://localhost:3000/](http://localhost:3000/).

To create a deployable version of the application, run `npm run build`.
