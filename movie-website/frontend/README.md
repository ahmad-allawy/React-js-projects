# Movie Master

![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blueviolet.svg)

## Description

Movie Master is a responsive React + Vite web app for browsing popular movies, saving favorites via a third-party movie API. It is designed to help users quickly find movie information, create personal watchlists, and practice modern frontend architecture (context, hooks, and component-driven UI).

## Features

- Search and browse popular movies
- Add/remove movies from favorites
- Persistent favorites via localStorage
- Clean UI with responsive layout
- Fast loading and client-side caching
- Reusable components (`MovieCard`, `NavBar`) and global state via `MovieContext`

## Screenshots

![App Screenshot](./assets/1.png)
![App Screenshot](./assets/2.png)
![App Screenshot](./assets/3.png)

## Installation

1. Clone repository:

```bash
git clone https://github.com/yourname/movie-website.git
cd movie-website/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open in browser:

`http://localhost:5173`

## Usage

- Navigate to Home to view movie list
- Click star or favorite button to add to Favorites
- Open Favorites page to manage saved movies

### Run production build

```bash
npm run build
npm run preview
```

## Configuration

- Ensure Node.js v18+ installed
- Copy `.env.example` or create `.env` in project root:

```bash
cd movie-website/frontend
cp .env .env.example
```

- Set your TMDb API key in `.env`:

```bash
VITE_API_KEY=your_api_key_here
```

- Do not commit secrets. `.env` is not tracked by git (add to .gitignore if missing).
- The app uses `src/services/api.js` and `import.meta.env.VITE_API_KEY`.

## Acknowledgments

- Vite
- React
- TMDb API (or other movie API)
- Open-source component patterns

