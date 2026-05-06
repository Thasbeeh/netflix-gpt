# Netflix GPT

- Create react app using vite
- configured test related depndencies - vitest and jest-dom
- Installed tailwind
- header
- routing
- Sign in & sign up
- Form validation
- useRef hook
- NestJS backend setup
- Create Signup user account
- Created sign in user api
- created redux store to store access token and user
- Implemeneted signout, clear token & user from store

# Features

- Login/Sign Up
  - Sign in / sign up form
  - redirect to browse page

- Browse (after authentication)
  - Header
  - Main movie
    - Trailer in background
    - Title and description
    - Movie suggestions
      - MovieLists \* N

- Netflix GPT
  - Search bar
  - Movie Suggestions

- Lear about axios interceptor
  -- config
  -- request / response
  -- useSelector() is not avail inside axios, thus use getState() to get state variable

# Things I done

- global instace for axio
  -- used interceptor for request to attach token in header
  -- interceptor for response, if error retry for refresh token - to do
- get access token
  -- need to move to seperate file for clean structure
- set up redux store, slice
- set access token in slice

# Decisions

Why axios interceptors?

- Request and response handling can be easily done with axios interceptors
- If token exist, token can be attached in request header from interceptor
- If error response has error, we can send token refresh request from response interceptor.

Why redux toolkit for token storage?

- Token can be stored in localStorage, but vulnarebale to XSS attack
- Token can be stored in React Context, but Contexts are available inside React only. Meanwhile axios interceptors lies outside react. Thus useContext() cannot be used.
  -- If I stick on Contexts, I have to create a module/ref/replica of actual token, to use outside React.
  -- It has inconsistency risk, because token is no more a single source of truth - One original and one replica/ref will be there.
- Thus, redux is used, which can make use in axios interceptors. Because both axios & RTK lies outside react.

How do you persist auth state without Firebase?
Answer:
“I treat the backend as the source of truth. On app load, I call a protected /me endpoint. If the access token is expired, I use a refresh token stored in an HTTP-only cookie to obtain a new one. Redux only mirrors the authenticated user state—it’s not the source of truth.”
