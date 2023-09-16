import styles from "./css/index.css";
import { type LinksFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <div className="app">
                    <Header />
                    <main className="main-container">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
};