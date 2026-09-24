# Waikato Digital & Tech Ecosystem

Waikato Digital & Tech Ecosystem is a client-delivered web application built by
a three-person team during my University of Waikato industry internship. We
moved the client's ecosystem site from a no-code approach to a coded Next.js
application with a searchable organisation directory, interactive map, case
studies, and stakeholder forms.

## My Role

As the frontend developer, I:

- Implemented the responsive site interface across the homepage and eight main
  subpages with Next.js, TypeScript, and Tailwind CSS.
- Built the organisation directory's search and filtering experience and an
  interactive Google Maps view with clustered markers.
- Connected data-driven frontend screens to the team's Xano endpoints.
- Built the Join, Contact, and Opt-out form interfaces with client-side
  validation and feedback; added Photon address autocomplete to Join and
  collaborated with the backend teammate on submission integration.
- Demonstrated frontend progress to the client and refined the UI from feedback.

## What It Includes

- Responsive Next.js and TypeScript pages styled with Tailwind CSS
- Searchable and filterable ecosystem organisation directory
- Google Maps view with marker clustering
- Case study pages and three validated stakeholder forms
- Frontend integration with Xano organisation data

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Google Maps API
- Xano
- Axios
- Lucide React

## Getting Started

Install dependencies:

```bash
npm install
```

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in the required values in `.env.local`, including the Google Maps key and
Xano API configuration.

Run the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Handover Notes

This repository preserves the project source at handover. To run data-driven
views, supply the required Xano and Google Maps environment variables. In the
published snapshot, the form interfaces retain demo submit handlers; the team
worked together on the backend integration during delivery.

The client received the project at the end of the internship; ongoing
maintenance was outside our team's scope.

## Project Structure

- `src/app`: App routes and page-level UI
- `src/components`: Shared layout components
- `public`: Images, logos, and other static assets
- `CaseStudies`: Source case study material used by the project
