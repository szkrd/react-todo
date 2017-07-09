# react todo app

Simple todo app with redux.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Usage

1. `npm i`
2. `npm start`

## Redux notes

### Introduction

Changing parts of the app state is hard to follow, hence we create a new object
each and every time.

1. dispatch an action
2. the reducer catches those and recreates the new store accordingly

This is good, because:

1. we have a single source of truth: no one can write the store on a whim,
   whatever happens, that will come in the form of an action and the
   reducer (and only the reducer) will deal with that.
2. no one can touch the state directly, only actions are permitted,
   so the state itself may as well be readonly
3. reducers are pure functions, input and output is deterministic,
   nothing will be mutated or altered, no magic

### Using with React

1. create actions and reducers
2. add Provider wrapper component around app (`<Provider store={store}>`)
3. use connect with functional components
4. use classconnect for classes
5. instead of state use props for the store
6. instead of methods use actions from props
7. use redux-thunk for lazy actions

## Todo

Add ui store, loading spinner
