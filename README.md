# Waikato Digital & Tech Ecosystem

This repository contains the final version of a team project completed for the
University of Waikato Master of IT programme.

The project recreates the Waikato Digital & Tech Ecosystem website as a coded
Next.js application. The site includes public pages, an ecosystem directory, a
map view, case studies, and several forms for joining or contacting the
ecosystem.

It was built during an internship-style client project, so the repository is
kept close to the final version we delivered to the client rather than being
rewritten afterwards as a production product.

## My Role

My main responsibility was the frontend work. I translated the client's
no-code website into a responsive Next.js interface, built the page layouts and
components, worked on the map/search/filter experience, and connected frontend
pages with the team's Xano backend endpoints.

I also joined client meetings and demos, then adjusted the UI based on feedback
during the project.

## What It Includes

- A Next.js and TypeScript frontend
- Responsive pages styled with Tailwind CSS
- Google Maps integration for ecosystem organisations
- Search and filter views for the organisation directory
- Case study pages based on project content
- Demo form pages for joining, contact, and opt-out flows
- Xano API integration for organisation data

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

## Project Notes

This was an internship-style project delivered to a client. After the internship
ended, our team was not responsible for ongoing maintenance, so this repository
shows the final delivered version rather than a continuously maintained service.
Some parts are intentionally left as they were at handover time:

- The directory and map pages require valid Xano environment variables.
- Some statistics and filter options are static placeholders.
- The join, contact, and opt-out forms use demo handlers rather than a live
  submission service.
- The repository keeps the original project structure so it remains close to
  the version delivered to the client.

## Project Structure

- `src/app`: App routes and page-level UI
- `src/components`: Shared layout components
- `public`: Images, logos, and other static assets
- `CaseStudies`: Source case study material used by the project
