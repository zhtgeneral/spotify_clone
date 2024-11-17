# Music player app

### What it does

The web app allows users to listen, favorite, and add songs.

TODO The project is end-to-end tested and tests mobile and desktop scenarios.

The UI is reponsive for mobile and desktop browsers.

### How to recreate

##### Third party steps

NextJS, React, Tailwind CSS:

- `npx create-next-app@latest`
- Select App router, Tailwind, Typescript

Supabase:

- Create project on Supabase dashboard
- Setup database:
  - `npm install supabase`
  - `npx supabase login`
  - `npx supabase init`
  - Create schema and relations on Supabase dashboard
  - `npx supabase gen types --lang=typescript --project-id "<project id>" --schema public > database.types.ts` ([example](./types_db.ts))

- create Supabase instance for non-authenticated use ([example](/libs/supabaseAdmin.ts)):

  - `npm install @supabase/supabase-js`
  - Copy and paste `supabase url` and `anon key` into environment variables

- setup storage:
  - Create buckets on Supabase dashboard

- setup Auth:
  - setup providers:
    - setup Google provider on Google cloud console:
      - create new project
      - go to API and services
      - go to Credentials
      - create OAuth client key
      - Select web app
      - Copy and paste `https://<project id>.supabase.co/auth/v1/callback` from Supabase auth providers into Google Authorized Redirect URI.
      - Copy and paste Google `Client ID` and `Client secret` into Supabase auth providers.
    - setup Github provider on Github settings:
      - go to settings
      - go to developers
      - go to OAuth apps
      - New OAuth app
      - set Homepage URL as `http://localhost:3000` (need to change in prod)
      - copy and paste `https://<project id>.supabase.co/auth/v1/callback` into Github Authorization callback URL
      - copy and paste `Client ID` and `Client secret` from Github into Supabase auth providers
  - setup Supabase Auth ([example](/components/modals/AuthModal.tsx))
    - `npm install @supabase/auth-ui-react` (for login screen)
    - `npm install @supabase/auth-ui-shared` (for login screen styles)
    - use `<Auth>` and pass in `SupabaseClient`
  
(old version)

- setup Supabase for client and server:
  - `npm install @supabase/auth-helpers-react` (for client)
  - `npm install @supabase/auth-helpers-nextjs` (for server)
  - Use `createClientComponentClient` to use `Supabase` inside of client components ([example](/providers/SupabaseProvider.tsx), [example](/components/LikeButton.tsx))
    - Create a Supabase provider to give global access to `useSupabaseClient` hook in client components
  - Use `createServerComponentClient` to use `Supabase` outside of client components ([example](/actions/getActiveProductsWithPrices.ts))
  - Use `createRouteHandlerClient` with cookies for authenticated server use ([example](/app/api/checkout/route.ts))
- setup middleware ([example](/middeware.ts)):
  - use `createMiddlewareClient` and cookies to create middleware `Supabase`
  - call `getSession` on middleware client to check if session expired

(newest version [link](https://supabase.com/docs/guides/auth/server-side/nextjs))

- `npm install @supabase/supabase-js @supabase/ssr`
- setup Supabase Client:
  - create `supabase` using `createBrowserClient` with `supabase url` and `anon key`
  - configure cookies:
    - setup `getAll` by getting all cookies
    - setup `setAll` by storing each cookie
- setup Supabase Server:
  - create `supabase` using `createServerClient` with `supabase url` and `anon key`
- setup middleware (optional):
  - setup `supabaseResponse` to get traverse the request by 1
  - create `supabase` using `createServerClient` with `supabase url` and `anon key` 
  - setup cookies:
    - setup `getAll` as a callback to get all cookies from current request
    - setup `setAll(cookies)`:
      - set each cookie onto the current request
      - traverse `supabaseResponse` by 1
      - set each cookie onto the `supabaseReponse`
  - call `getUser` using Supabase server client and handle protected routes:
    - If there is no user and the next request is a protected route, redirect user to different location
    - Otherwise allow the user to reach the route
- use `createClient` from client to use `supabase` in client component
- use `createClient` from server to use `supabase` in server component
- create an endpoint for `/auth/confirm`
  - exchange their secure code for an auth token when user confirms email with link

TODO setup Stripe details