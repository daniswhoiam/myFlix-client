# MyFlix Client

This is the code for the client-side of the myFlix application, for which the necessary backend code (i.e. an API) was written in another repo ('movies_api').

## Views

This frontend consists of multiple views, such as:

* Log-In page, where users can log-in or switch to registration view
* Registration page, where users can register or go back to log-in view
After log-in:
* Main page, where the user sees a list of movies (or rather movie cards) that he can open to see more details, mark as favorites or filter (by search term or favorites)
* Detailed views of movies and directors & genres (both accessible via movies only)
* Profile page, where the user can update his username, password and e-mail address, or delete his account

## Technology

This client-side code was written using React as a framework and by applying the Flux design pattern in form of React Redux.

## Installation

```bash
npm install
```

## Last Updated
16.05.2021