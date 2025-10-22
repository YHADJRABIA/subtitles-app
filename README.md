# PySubs

![Application architecture diagram](/public/architecture.png)

## Overview

PySubs is a fully internationalised subtitles platform built with Next.js 15. It provides a multilingual browsing experience for TV series and film subtitles, a secure authentication workflow, and a rich dashboard for authenticated users. The project integrates tightly with DatoCMS for content management and MongoDB for persistent storage.

## Features

- **Internationalised UX** with locale-aware routing, translated UI copy, and localized API responses.
- **Authentication suite** supporting registration, login, email verification, password recovery, and two-factor flows powered by `next-auth`, JWTs, and transactional emails via Nodemailer.
- **Dashboard experience** gated behind protected routes, backed by session checks in `src/middleware.ts`.
- **Public catalogue** to explore shows and download subtitle assets.
- **Content management** via DatoCMS with preview links, draft content access, and post-deploy automation.
- **API rate limiting** through Upstash Redis middleware to mitigate abuse.
- **Form validation** implemented with `zod` and `react-hook-form`.
- **Typed GraphQL layer** generated with `gql.tada` for end-to-end type safety.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, SCSS modules, `next-intl`.
- **Backend**: Next.js App Router APIs, MongoDB (via Mongoose), Upstash Redis.
- **Auth & Sessions**: `next-auth`, JWT, Nodemailer.
- **CMS**: DatoCMS (REST & GraphQL APIs).
- **Tooling**: ESLint, Prettier, Jest, Husky, Docker, Vercel Analytics.

## Getting Started

### Prerequisites

- Node.js `^20.18.0` (matching the Docker image).
- npm `^10`.
- Access credentials for MongoDB, DatoCMS, Google OAuth, Google reCAPTCHA, Nodemailer, and Upstash.

### Installation

```bash
npm install
```

### Development server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser. The app automatically detects the default locale defined in `src/i18n/routing.ts`.

### Docker workflow

Build and run the containerized app using the provided `Dockerfile`:

```bash
docker build -t pysubs .
docker run -p 3000:3000 --env-file .env.local pysubs
```

Alternatively, adapt `docker-compose.yml` to orchestrate services for local development.

## Environment variables

Create a `.env.local` file with the following keys:

| Variable                                                                              | Purpose                                                                        |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `MONGODB_URI`                                                                         | MongoDB connection string used by `src/lib/mongodb.ts`.                        |
| `NEXTAUTH_SECRET`                                                                     | Shared secret for NextAuth sessions (also referenced in `src/middleware.ts`).  |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`                                           | OAuth credentials for Google sign-in.                                          |
| `SECRET_API_TOKEN`                                                                    | Token gate for CMS webhooks and preview routes in `src/app/api/cms/*`.         |
| `NEXT_ISR_REVALIDATION_TOKEN`                                                         | Secret token required to trigger `src/app/api/series/revalidate/route.ts`.     |
| `DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN`                                                 | DatoCMS published content token consumed by `src/lib/datocms/executeQuery.ts`. |
| `DATOCMS_DRAFT_CONTENT_CDA_TOKEN`                                                     | Optional draft content token for preview builds.                               |
| `NODEMAILER_SENDER_EMAIL` / `NODEMAILER_SENDER_EMAIL_PASSWORD` / `NODEMAILER_SERVICE` | Outbound email configuration in `src/lib/mail.ts`.                             |
| `EMAIL_VERIFICATION_TOKEN_LIFETIME_HOURS`                                             | Email verification token expiry window.                                        |
| `EMAIL_VERIFICATION_CODE_LIFETIME_MINUTES`                                            | Verification code expiry window.                                               |
| `PASSWORD_RESET_TOKEN_LIFETIME_HOURS`                                                 | Password reset token expiry window.                                            |
| `GOOGLE_RECAPTCHA_SECRET`                                                             | Server-side validation secret for `src/utils/validators.ts`.                   |

Optional values (such as staging URLs or analytics keys) can be added as needed.

## Available npm scripts

- `npm run dev` — Start the Next.js development server.
- `npm run build` — Create a production build.
- `npm run start` — Serve the production build.
- `npm run lint` / `npm run lint:fix` — Run ESLint checks, optionally auto-fixing issues.
- `npm run check-types` — Type-check the project with `tsc`.
- `npm run check-format` / `npm run format` — Verify or enforce Prettier formatting.
- `npm run check-lint` — Run ESLint with custom configuration.
- `npm run verify` — Execute formatting, linting, type-checking, and build in sequence.
- `npm run test` / `npm run test:watch` — Execute unit tests with Jest.
- `npm run generate:favicon` — Generate favicons from the base assets.
- `npm run generate-schema` — Fetch the DatoCMS GraphQL schema via `gql.tada` (requires a configured environment).

## Internationalisation

Locales are defined in `src/i18n/routing.ts` and currently include English (`en`) and French (`fr`). The `localePrefix` strategy exposes the default locale without a prefix while providing locale-specific paths for translated routes in the dashboard, auth pages, and series listings.

## Testing & Quality

- **Unit tests**: `npm run test` executes Jest with the JSDOM environment configured in `jest.config.ts`.
- **Type safety**: `npm run check-types` ensures the TypeScript project compiles without emitting artifacts.
- **Static analysis**: `npm run lint` and `npm run check-lint` maintain consistent code standards.
- **Formatting**: `npm run check-format` and `npm run format` enforce Prettier rules matching `.prettierrc`.
- **Pre-push hook**: Husky runs the `verify` script to prevent pushing failing builds.

## Deployment

The application can be deployed to platforms that support Next.js (e.g., Vercel). Ensure that all runtime secrets are configured, integrate DatoCMS webhooks for cache invalidation, and provide the correct frontend URL with `SECRET_API_TOKEN` when setting up CMS preview plugins.

## Support

- **Support the project**: `https://buymeacoffee.com/y.h.r`
- **Portfolio**: `https://yhr.vercel.app`

## License

This project is currently distributed without an explicit license. Contact the repository owner for usage inquiries.
