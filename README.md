# Music player app

### What it does

The web app allows users to listen, favorite, and add songs.

TODO The project is end-to-end tested and tests mobile and desktop scenarios.

The UI is reponsive for mobile and desktop browsers.

### How to run
Create .env file at root and fill out these variabls
```
# Used after checkout redirect 
# Include http:// or https://
# Do not include / at the end
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# for accessing db on supabase
NEXT_PUBLIC_SUPABASE_URL=https://<>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<>
SUPABASE_SERVICE_ROLE_KEY=<>

# for accessing db on stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<>
NEXT_PUBLIC_SECRET_KEY=<>

# for monitoring webhooks with stripe
STRIPE_WEBHOOK_SECRET=<>

# for use with supabase
GITHUB_CLIENT_SECRET=<>
GOOGLE_CLIENT_SECRET=<>
GOOGLE_REDIRECT_URL=<>
```

- To run the app: `npm run dev`
- To open component tests `npm run storybook`
- To run stripe webhooks:
  - `stripe login`
  - `stripe listen --forward-to localhost:3000/api/webhooks`
  - copy and paste WEBHOOK_SIGNING_SECRET into environment variables
  - ensure project is running on `localhost:3000`
  - Create product on Stripe Dashboard

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
  - setup Supabase Auth:
    - `npm install @supabase/auth-ui-react` (for login screen)
    - `npm install @supabase/auth-ui-shared` (for login screen styles)
    - use `<Auth>` and pass in `SupabaseClient` ([example](/components/modals/AuthModal.tsx))
  
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

Stripe (TODO update for Stripe Sandboxes instead of Test mode):

- `npm install stripe`
- setup Account on Stripe dashboard:
  - Create new account
  - Developers
  - API keys
  - Copy and paste `Publishable key` and `Secret key` into environment variables
- Create instance of stripe with `secret key` ([example](/libs/stripe.ts))
- Setup Stripe checkout:
  - create endpoint for `/checkout`
  - use `stripe.checkout.sessions.create` to redirect to checkout form ([example](/app/api/checkout/route.ts))
  - set `success_url` and `cancel_url`
- Setup Stripe portal:
  - Enable stripe customer portal on Stripe dashboard:
    - Settings
    - Billing
    - Customer portal
    - Activate test link
  - create endpoint for `/portal`
  - use `stripe.billingPortal.sessions.create` to redirect to portal form ([example](/app/api/portal/route.ts))
- Setup webhooks to sync data across Stripe and database:
  - Enable stripe webhooks on Stripe dashboard:
    - Devlopers
    - Event destinations
    - Create an event destination
    - Test in a local environment (need to add steps in prod)
  - Download Stripe CLI (windows):
    - `iwr -useb get.scoop.sh | iex` (installs Scoop as package manager for Stripe CLI)
    - `scoop install stripe`
    - `stripe login`
    - `stripe listen --forward-to localhost:3000/api/webhooks`
    - copy and paste `WEBHOOK_SIGNING_SECRET` into environment variables
  - create endpoint / helper functions to sync stripe events data with database ([example](/libs/supabaseAdmin.ts)):
  - create webhook endpoint to listen to `POST` requests ([example](/app/api/webhooks/route.ts)):
    - create Stripe events using `stripe.webhooks.constructEvent` with `webhook signing secret` 
    - monitor selected events and sync data with database
  - manually test endpoint using CLI or Stripe Dashboard

TODO Cypress

- need to refactor client database usage to REST API

Storybook

- `npx storybook@latest init`
- Add autodocs, and extend api url from env file in storybook config ([example](/.storybook/main.ts))
- Create mocks for app router ([example](/stories/pages/home.stories.tsx))

##### The rest of the implementation

Modals:

- `npm install zustand` and create stores for modal active states ([example](/hooks/modals/useAuthModal.ts))
- create modals ([example](/components/modals/AuthModal.tsx), [example](/components/modals/UploadModal.tsx), [example](/components/modals/SubscribeModal.tsx))

Front end:

- create `error.tsx` at root page to catch errors at child pages ([example](/app/error.tsx))
- create `loading.tsx` at specific pages to display loading
- create variables for themes ([use case](/components/Header/Header.tsx), [use case](/components/LikeButton.tsx)):
  - create rbg values in `globals.css` ([example](/app/globals.css))
  - create tailwind variables using css variables ([example](/tailwind.config.ts))

Sound player:

- `npm install howler`
- `npm install  @types/howler`
- create global stores for current and all songs ([example](/hooks/usePlayer.ts))
- create controller to control the sound and audio ([example](/hooks/useSoundController.ts))