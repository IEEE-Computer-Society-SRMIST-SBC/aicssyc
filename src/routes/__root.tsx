import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { SmoothScroll } from "../components/site/SmoothScroll";
import { BackgroundFog } from "../components/site/BackgroundFog";
import { Analytics } from "@vercel/analytics/react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "AICSSYC 2026 - All India Computer Society Student & Young Professional Congress",
  alternateName: "AICSSYC 2026",
  description:
    "The flagship IEEE Computer Society SYP Congress 2026 at SRM IST Kattankulathur with the theme 'Where Agents Meet Humans'. Featuring distinguished keynotes, hands-on workshops, AI tracks, and networking.",
  startDate: "2026-10-08T09:00:00+05:30",
  endDate: "2026-10-11T18:00:00+05:30",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: ["https://aicssyc.ieeecssrm.in/banner.jpg", "https://aicssyc.ieeecssrm.in/logo.png"],
  location: {
    "@type": "Place",
    name: "Dr. T.P. Ganesan Auditorium, SRM Institute of Science and Technology",
    address: {
      "@type": "PostalAddress",
      streetAddress: "SRM Nagar, Kattankulathur",
      addressLocality: "Chengalpattu",
      addressRegion: "Tamil Nadu",
      postalCode: "603203",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.823033,
      longitude: 80.040183,
    },
  },
  organizer: {
    "@type": "Organization",
    name: "IEEE Computer Society SRM IST Student Branch Chapter",
    url: "https://aicssyc.ieeecssrm.in",
    email: "ieeecomputersocietysrmist@gmail.com",
    sameAs: ["https://www.instagram.com/ieeecs_srmist/"],
  },
  offers: {
    "@type": "AggregateOffer",
    url: "https://aicssyc.ieeecssrm.in/#tickets",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01T00:00:00+05:30",
  },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AICSSYC 2026 | IEEE Computer Society SYP Congress | SRM IST" },
      {
        name: "description",
        content:
          "Join AICSSYC 2026 at TP Ganesan Auditorium, SRM IST (8–11 Oct 2026). Discover keynotes, workshops & networking at India's premier IEEE CS congress.",
      },
      {
        name: "keywords",
        content:
          "AICSSYC 2026, IEEE Computer Society, SYP Congress, SRM IST, TP Ganesan Auditorium, AI conference, Kattankulathur, Where Agents Meet Humans",
      },
      { name: "author", content: "IEEE Computer Society SRM IST" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#060D0A" },
      {
        property: "og:title",
        content: "AICSSYC 2026 — IEEE Computer Society SYP Congress",
      },
      {
        property: "og:description",
        content:
          "Join India's premier IEEE Computer Society congress at SRM IST, Kattankulathur (8–11 Oct 2026). Experience keynotes, AI tracks, and national networking.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AICSSYC 2026" },
      { property: "og:url", content: "https://aicssyc.ieeecssrm.in/" },
      { property: "og:image", content: "https://aicssyc.ieeecssrm.in/banner.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "AICSSYC 2026 Banner — Where Agents Meet Humans at SRM IST",
      },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "AICSSYC 2026 — IEEE Computer Society SYP Congress",
      },
      {
        name: "twitter:description",
        content:
          "India's flagship IEEE CS SYP congress at SRM IST (8–11 Oct 2026). Keynotes, workshops & innovation under 'Where Agents Meet Humans'.",
      },
      { name: "twitter:image", content: "https://aicssyc.ieeecssrm.in/banner.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://aicssyc.ieeecssrm.in/" },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/logo.png" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(eventJsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <SmoothScroll>
          <BackgroundFog />
          {children}
        </SmoothScroll>
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
