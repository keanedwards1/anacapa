# Anacapa Industrial Supply

A React marketing site with a small Express API and MongoDB-backed category data. The website is designed to deploy as a Vercel static frontend with the API hosted separately.

## Local development

1. Install frontend dependencies: `cd client && npm install`
2. Install API dependencies: `cd ../server && npm install`
3. Start the API with `npm run dev` from `server/`.
4. Start the frontend with `npm run dev` from `client/`.

The API serves a starter catalog when `MONGODB_URI` is unset. Set it in `server/.env` to connect a MongoDB Atlas database; the initial Turning and Milling categories are inserted on first connection.

## Deploy

### Frontend on Vercel

- Import the repository into Vercel.
- Set **Root Directory** to `client`.
- Vercel detects Vite. Use `npm run build` and `dist` as the output directory.
- Add `VITE_API_URL` with the deployed API base URL, for example `https://api.example.com`.

The frontend can render with its built-in category fallback if the API is not configured yet. When adding a custom domain, point the quote links at the final WhatsApp business destination.

### API on Render

- Create a Web Service from the same repository and set **Root Directory** to `server`.
- Use `npm install` as the build command and `npm start` as the start command.
- Add `MONGODB_URI` and `CLIENT_ORIGIN` as environment variables.
- Set `CLIENT_ORIGIN` to the deployed Vercel domain. For Vercel preview deployments, add the preview origins you intend to use.
- Add the API URL to Vercel as `VITE_API_URL` and redeploy the frontend.

The API has `/api/health` and `/api/catalog` endpoints. Quote requests are sent directly to Anacapa on WhatsApp or email; the site does not store visitor contact details.

## Project layout

- `client/`: Vite + React website, deployable independently to Vercel.
- `server/`: Express API and Mongoose model, deployable independently.
- The page uses the supplied Anacapa wordmark and real machining photos loaded from Pixabay's CDN. The photos show machining operations, not Anacapa inventory; each is credited beside the image.
