# ERP Portal: Project Overview for Claude

## Project Snapshot

This repository contains a full-stack school/education ERP portal. The frontend is a React single-page application built with Vite. The backend is an Express API using MySQL through `mysql2` and parameterized SQL queries.

The codebase has meaningful coverage of the main school-management workflows, including list pages and add/edit forms for the primary academic records. It should be treated as an in-progress project rather than a fully verified production system: the client build succeeds, but backend tests are not configured and some authentication/access-control behavior needs review.

## Technology

- Frontend: React 19, Vite 8, React Router 7, Axios, React Icons
- Backend: Node.js, Express 5, MySQL (`mysql2`), `jsonwebtoken`, `bcryptjs`
- Other server dependencies include `mongoose`, `cloudinary`, `multer`, and `mysql2`. The inspected DB connection uses MySQL; Mongoose and Cloudinary are declared dependencies but were not found in application source during this review.
- Client and server are separate npm packages under `client/` and `server/`.

## Features Present

- Login page and JWT-based login endpoint. Successful login returns a token with a seven-day expiry.
- Protected application layout with dashboard, sidebar, navigation, reusable stats cards, and tables.
- Dashboard and student detail view.
- Student management: list, add, edit, delete, pagination, class-related data, and student-count endpoints. Student create validation is present.
- Teacher management: list, add, edit, delete, and total-teacher endpoint.
- Class management: list, add, edit, and delete.
- Subject management: list, add, edit, and delete.
- Attendance management: list, add, edit, delete, overall attendance, and current-user attendance endpoints.
- Exam management: list, add, edit, and delete.
- Fees management: list, add, edit, delete, total collected, and balance-due endpoints.
- User CRUD API and teacher-subject API are present on the backend. A user-management page is not currently registered in the frontend routes.
- Axios attaches a stored JWT as a Bearer token to API requests.

## Repository Map

- `client/src/pages/`: login, dashboard, and primary module pages.
- `client/src/components/`: layout/navigation, protected route, tables, student detail, and add/update forms.
- `client/src/api/axios.js`: shared Axios client and token header.
- `server/server.js`: Express application setup and route mounting.
- `server/routes/`: API route definitions.
- `server/controllers/`: SQL-backed handlers and dashboard/count queries.
- `server/configs/db.js`: MySQL connection setup.
- `server/middlewares/`: JWT verification, role authorization, and error handling.
- `server/validators/`: request validation, currently including student validation.

## API Areas

The server mounts `/students`, `/teachers`, `/subjects`, `/classes`, `/fees`, `/attendence`, `/exam`, `/teacher_subject`, `/users`, and `/auth`. Most academic resources expose CRUD routes. Authentication is `POST /auth/login`.

Note: the public API spelling is `/attendence` (one `a` after `d`), matching the current code. Preserve it for compatibility unless intentionally migrating all callers.

## Configuration and Running

The server reads environment configuration through `dotenv`. The inspected code expects `PORT`, `JWT_SECRET`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`. The client Axios base URL is read from `VITE_API_URL`. Do not put real secrets in this document or commit them.

Run each package from its own directory:

```sh
cd server
npm install
npm start
```

```sh
cd client
npm install
npm run dev
```

The MySQL database and expected tables must exist before the server can start. Schema/migration setup was not verified from the inspected files.

## Verification Status

- `client`: `npm run build` completed successfully with Vite.
- `client`: lint script is available as `npm run lint`, but was not run for this overview.
- `server`: package test script is currently a placeholder that exits with an error; no automated backend test suite was identified.
- Database connectivity, schema, login flow, and end-to-end CRUD flows have not been runtime-tested here.

## Follow-Up Checks

1. **Login redirect mismatch:** `ProtectedRoute` navigates unauthenticated users to `/login`, while the login page is registered at `/`. Verify this flow; it may navigate to an undefined route.
2. **Inconsistent API protection:** several student read/count endpoints are public, while most other resource routes require a token. Most write routes only verify a token; explicit role authorization is visibly applied to student deletion but is not consistently applied to other mutations or the user CRUD routes. Confirm the intended role policy before production use.
3. **Client-side protection is token-presence only:** the React route guard checks whether local storage contains a token. The server should remain the source of truth for token validity and authorization.
4. **Database/dependency clarity:** confirm the required MySQL schema and whether the declared Mongoose/Cloudinary dependencies are needed.
5. **Testing:** add backend tests and verify the frontend against a configured API/database; a successful client build alone does not validate application behavior.

## Suggested Starting Point for Further Work

Before changing a module, trace its page/form through `client/src/api/axios.js`, the matching route file, controller, and SQL table/columns. Preserve the current MySQL-based implementation unless a database migration is explicitly intended. Prefer focused fixes and verify the affected client build or endpoint behavior after changes.