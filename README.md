# Software Engineering Homework 1 Frontend
This is the frontend component of a webapp that allows employees at a company to request leave from HR. 

## Setup
### Libraries
I'm using [React](https://react.dev/) (Typescript) for the frontend library and [Ant Design](https://ant.design/) (WHICH IS AMAZING) as my React UI library.
### Dependencies
Dependencies can be found in `package.json`. To install them run
```shell
npm install --save-dev
```
### Backend
This frontend assumes there is a backend running on `http://localhost:8000` and will die without it.
## Functionality
Users can register/login and create/delete leave requests (no editing cause that's lame). There's a profile page you can use to see your account info and how many leave days you have remaining.

You can also log in as an administrator using the username `admin` and password `bigchungus`. Admins can approve or deny employees' leave requests. Sadly, admins cannot request leave, since if they take leave, no one can approve/deny the leave of other employees. This is a sacrifice the company is willing to make.
- Pages can be found in `components/`.
- API requests/`axios` stuff to backend can be found in `apis/`