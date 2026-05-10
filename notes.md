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
- BugFix: Sign up user displayName and profile picture restrcited on header only when logged in
- BugFix: If the user not logged, /browse will redirect to Login page and vice-versa
- BugFix: Unmounted bootstrap refresh api callback from header
- Register TMDB API & craete an app & get access to access token
- Get data from TMDB of Now playing movies list
- Custom hook for Now Playing Movies
- Create moviesSlice
- Update store with movies
- Planning for MainContainer & SecondaryContainer
- Fecth data for Trailer video
- Update store with Trailer video data
- Embed youtube video and make it autoplay and mute
- Tailwind classes to make MainContainer look awsome
- Build secondary component
- Build Movie list for each category with horizontal scroll
- Build Movie card
- TMDB image CDN URL
- Improved UI with Tailwind
- Refactored custom hook of now playing movies
- Custom hook for fetch movie sections
- GPT Search page
- GPT Search bar
- Multi language feature
- Integrate GPT API

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

- Use AbortController to stop the network request. can be used as useEffect unmounting of function

# Things I done

- global instace for axio
  -- used interceptor for request to attach token in header
  -- interceptor for response, if error retry for refresh token - to do
- get access token
  -- need to move to seperate file for clean structure
- set up redux store, slice
- set access token in slice
