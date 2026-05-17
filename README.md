# 🎬 Netflix GPT

A full-stack Netflix-inspired streaming platform with AI-powered movie search, built with React, NestJS, and integrated with TMDB and OpenAI APIs.

---

## 🧱 Tech Stack

| Layer            | Technology                                |
| ---------------- | ----------------------------------------- |
| Frontend         | React (Vite), Tailwind CSS, Redux Toolkit |
| Backend          | NestJS, REST APIs, JWT Authentication     |
| Database         | PostgreSQL, Prisma ORM                    |
| State Management | Redux Toolkit (slices per domain)         |
| HTTP Client      | Axios (with interceptors)                 |
| AI Integration   | GROQ API                                  |
| Movie Data       | TMDB API                                  |
| Testing          | Vitest, jest-dom                          |

---

## ✨ Features

### Authentication

- Email/password sign up and sign in
- JWT-based session management stored in Redux
- Protected routes — unauthenticated users redirected to login; authenticated users redirected away from auth pages
- Sign out clears token and user state from store entirely

### Browse (Authenticated)

- Persistent header with conditional rendering based on auth state
- Hero section with auto-playing, muted background trailer fetched live from TMDB
- Movie suggestions across multiple categories (Now Playing, Popular, Top Rated, Upcoming)
- Horizontally scrollable movie lists per category with TMDB CDN images

### Infinite Scroll (Category Pages)

- Dedicated pages per movie category with vertical infinite scroll
- Page 1 results bootstrapped from the home page cache — no redundant initial fetch
- Each category tracks its own pagination state independently
- Scroll-triggered loading via `IntersectionObserver`

### Netflix GPT Search

- AI-powered search bar using OpenAI GPT API
- GPT interprets natural language queries and returns contextual movie suggestions
- Results rendered through the existing TMDB data pipeline
- Multi-language support via configurable language settings

### UX & Accessibility

- Fully responsive UI with Tailwind CSS
- Meta tags and semantic HTML for accessibility
- Language switcher for multi-locale support

---

## 🏗️ Architecture Decisions

### Global Axios Instance with Interceptors

Rather than attaching auth headers in every API call, a single Axios instance handles this centrally via request interceptors. Since `useSelector` is unavailable outside React components, Redux's `store.getState()` is used directly to read the access token inside the interceptor. A response interceptor is also in place to handle future token refresh flows.

### Redux as the Caching Layer

TMDB data (movies, trailers, paginated results) is stored in Redux slices rather than local component state. This allows the home page to pre-fetch page 1 of all categories on mount, and category pages to read from that cache on initial render — avoiding redundant network requests and making navigation feel instant.

### Independent Pagination State Per Category

Each movie category maintains its own `currentPage` and `isFetching` flag in the Redux slice. This prevents a common bug where navigating between category pages causes pagination to bleed across categories (e.g., visiting "Now Playing" at page 2, switching to "Popular," and incorrectly starting Popular from page 3).

### IntersectionObserver for Scroll Detection

Scroll events are expensive at scale. The `IntersectionObserver` API observes a sentinel element at the bottom of each category list. When it enters the viewport, the next page is fetched. The observer is disconnected on component unmount via `useEffect` cleanup, preventing memory leaks.

### AbortController for Request Lifecycle

Network requests tied to component lifecycle are cancelled on unmount using `AbortController`. This is especially relevant for the header's bootstrap API calls, preventing state updates on unmounted components.

---

## 🧩 Key Engineering Challenges

### Infinite Scroll Race Conditions & Duplicate Requests

**Problem:** Rapid scrolling or fast re-renders triggered multiple simultaneous requests for the same page, causing duplicate data in the list.

**Solution:** An `isFetching` flag per category in Redux acts as a guard. Before dispatching a fetch, the flag is checked — if a request is already in flight, the new one is dropped. The flag resets on success or failure.

### Page Refresh on Category Pages

**Problem:** Refreshing directly on `/now-playing` skipped page 1 (which was pre-loaded on the home page) and started rendering from page 2, causing an empty initial view.

**Solution:** On category page mount, the component checks if page 1 data already exists in the Redux store. If it does, it renders immediately from cache and sets `currentPage = 1`, so the next scroll correctly fetches page 2. If cache is empty (direct refresh), page 1 is fetched fresh.

### Cross-Category Pagination Bleed

**Problem:** Navigating from one category at page 3 to another category caused the second category to start fetching from page 3 instead of its own next page.

**Solution:** Pagination state is namespaced per category in the Redux slice (`movies.nowPlaying.currentPage`, `movies.popular.currentPage`, etc.). Each counter is independent and only increments for its own fetch actions.

### GPT Search State Persistence Across Routes

**Problem:** GPT search results persisted in state when navigating away from `/gpt-search` and back, displaying stale results on fresh visits.

**Solution:** The GPT search slice is reset on route change via a `useEffect` watching the current route. State is cleared on component mount before any new search is initiated.

### Home Page Performance with Large TMDB Payloads

**Problem:** TMDB returns large result sets per category. Rendering everything on the home page caused slow initial load and unnecessary data transfer.

**Solution:** Home page movie sections are capped at 20 results per category. Full paginated data is only loaded on dedicated category pages where infinite scroll is contextually appropriate.

---

## 🔐 Auth Flow

```
User submits credentials
        ↓
POST /auth/signin  →  NestJS validates, issues JWT
        ↓
Token stored in Redux (userSlice)
        ↓
Axios interceptor reads token via store.getState()
and attaches it to all outgoing request headers
        ↓
Protected routes check Redux auth state to allow or redirect
```

---

## 🚀 Running Locally

```bash
# Frontend
cd client
npm install
npm run dev

# Backend
cd server
npm install
npm run start:dev
```

**Environment variables:**

```env
# Frontend (.env)
VITE_TMDB_ACCESS_TOKEN=
VITE_OPENAI_API_KEY=

# Backend (.env)
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRY=
```

---

## 🔭 Planned Improvements

- JWT refresh token rotation with silent re-authentication
- Redis caching for TMDB responses on the backend to reduce external API calls
- Rate limiting on GPT search endpoint to manage OpenAI API costs
- Cursor-based pagination on the backend for more consistent infinite scroll behaviour
- Unit and integration test coverage for Redux slices and custom hooks
