# 🎬 Netflix GPT

A Netflix-inspired frontend with AI-powered movie search, built with React and integrated with TMDB and Groq APIs.

---

## 🧱 Tech Stack

| Layer            | Technology           |
| ---------------- | -------------------- |
| Framework        | React (Vite)         |
| Styling          | Tailwind CSS         |
| State Management | Redux Toolkit        |
| HTTP Client      | Axios (interceptors) |
| AI Integration   | Groq API             |
| Movie Data       | TMDB API             |
| Testing          | Vitest, jest-dom     |

---

## ✨ Features

### Authentication

- Email/password sign up and sign in forms with validation
- JWT access token stored in Redux and attached to all requests via Axios interceptors
- Protected routes — unauthenticated users redirected to login; authenticated users redirected away from auth pages
- Sign out clears token and user state from the store

### Browse (Authenticated)

- Persistent header with conditional rendering based on auth state
- Hero section with auto-playing, muted background trailer fetched YouTube based on data fetched from TMDB
- Movie suggestions across multiple categories: Now Playing, Popular, Top Rated, Upcoming
- Horizontally scrollable movie lists per category with TMDB CDN images

### Category Pages with Infinite Scroll

- Dedicated page per movie category with vertical infinite scroll
- Page 1 results bootstrapped from the home page Redux cache — no redundant initial fetch
- Each category tracks its own pagination state independently
- Scroll detection via `IntersectionObserver`

### Netflix GPT Search

- Natural language movie search powered by Groq API
- Groq interprets the query and returns contextual suggestions rendered via TMDB data
- Multi-language support via configurable language settings

### UX & Accessibility

- Fully responsive UI with Tailwind CSS
- Meta tags and semantic HTML for accessibility
- Language switcher for multi-locale support

---

## 🏗️ Architecture Decisions

### Global Axios Instance with Interceptors

A single Axios instance attaches the JWT to every outgoing request via a request interceptor. Since `useSelector` is unavailable outside React components, `store.getState()` is used directly inside the interceptor to read the token without coupling it to any component.

### Redux as the Caching Layer

TMDB data — movies, trailers, paginated results — is stored in Redux slices rather than local component state. The home page pre-fetches page 1 of all categories on mount. Category pages read from that cache on initial render, making navigation feel instant and avoiding redundant API calls.

### Independent Pagination State Per Category

Each category maintains its own `currentPage` and `isFetching` flag in the Redux slice. This prevents pagination from bleeding across categories when navigating between pages.

### IntersectionObserver for Scroll Detection

A sentinel element at the bottom of each category list is observed via `IntersectionObserver`. When it enters the viewport, the next page is fetched. The observer is disconnected on component unmount via `useEffect` cleanup to prevent memory leaks.

---

## 🧩 Key Engineering Challenges

### Infinite Scroll Race Conditions & Duplicate Requests

**Problem:** Rapid scrolling triggered multiple simultaneous requests for the same page, causing duplicate entries in the list.

**Solution:** An `isFetching` flag per category in Redux acts as a guard. Before dispatching a fetch, the flag is checked — if a request is already in flight, the new one is dropped. The flag resets on success or failure.

### Page Refresh on Category Pages

**Problem:** Refreshing directly on `/now-playing` skipped page 1 (pre-loaded from the home page) and started from page 2, causing an empty initial view.

**Solution:** On mount, the component checks if page 1 exists in the Redux store. If it does, it renders from cache and sets `currentPage = 1` so the next scroll correctly fetches page 2. If the cache is empty (direct refresh), page 1 is fetched fresh.

### Cross-Category Pagination Bleed

**Problem:** After scrolling "Now Playing" to page 3, navigating to "Popular" caused it to start fetching from page 3 instead of page 2.

**Solution:** Pagination state is namespaced per category (`movies.nowPlaying.currentPage`, `movies.popular.currentPage`, etc.). Each counter is independent and only incremented by its own fetch actions.

### GPT Search State on Route Change

**Problem:** GPT search results persisted when navigating away from `/gpt-search` and returning, displaying stale results.

**Solution:** A `useEffect` watching the current route resets the GPT slice on mount, clearing results before any new search runs.

### Home Page Performance

**Problem:** TMDB returns large result sets. Rendering all results on the home page caused unnecessary data transfer and slower renders.

**Solution:** Home page sections are capped at 20 results per category. Full paginated data is only loaded on dedicated category pages where infinite scroll is appropriate.

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

**Environment variables (`env.local`):**

```env
VITE_GROQ_API_KEY=
VITE_API_BASE_URL=
```
