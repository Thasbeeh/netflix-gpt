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
- Router for effieciency
- Seperate page for each movie category with infine scroll
- BugFix: Refreshing Movie section load contents page 2 onwards
- BugFix: Limited to home page movies to max 20 for each section
- BugFix: GPT search state change with change in route from /gpt-search
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

# Infinite Scroll

- Edge cases
  --The real complexity lies in:
  -- Tracking current page per category
  -- Preventing duplicate requests
  -- Handling cached page 1 data
  -- Resetting correctly on refresh
  -- Ensuring each category maintains independent pagination state
  -- Avoiding race conditions

- Skeleton

```
  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        console.log("Load next page");
      }
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);
```

- From backend pass - page, results[], total_pages ✅
- reducer functions - fetch started, fetch succeeded, fetch failed ✅
- write fetch and update logic in front end ✅
  -- get current page
  -- set next page, current page + 1
  -- dispatch fetch started
  -- send request with category and nextPage
  -- collect response
  -- set fetch succeeded
  -- If failed, dispacth fetch failed

- Assumptions
  -- 4 movies categories - Now playing, popular, top rated, upcoming
  -- From home page, page 1 result of all categories are cached into redux on initial load
  -- On going to "Now playing/popular/top rated/upcoming" page, page 1 result which is already in cache is used to render initially. Later, as user scrolls down, page 2, 3, etc has to be appended to cache.

- What to do / avoid following scenarios:
  -- On scroll down, page should jump from 1 to 2, instead 1 to 3.
  -- On scroll down, only next single page should be loaded, more than 1 next page should not be loaded.
  -- Page Refresh from "Now playing/popular/top rated/upcoming", page 1 result of "Now playing/popular/top rated/upcoming" has to be loaded, it should n't start from page 2 results.
  -- Suppose "Now playing" page 2 result loaded, then going to Popular, and scroll down, it fetches page 3 onwards instead page 2 of popular.

- The real complexity lies in:
  -- Tracking current page per category
  -- Preventing duplicate requests
  -- Handling cached page 1 data
  -- Resetting correctly on refresh
  -- Ensuring each category maintains independent pagination state
  -- Avoiding race conditions
