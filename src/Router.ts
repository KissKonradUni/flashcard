import HomeRoute from "./routes/Home.svelte";
import NotFoundRoute from "./routes/NotFound.svelte";
import LearnRoute from "./routes/Learn.svelte";

declare const __IS_LOCAL__: boolean;
console.log(`Running in ${__IS_LOCAL__ ? "local" : "production"} mode.`);
export const IS_LOCAL = __IS_LOCAL__;
export const BASE_URL = (typeof __IS_LOCAL__ !== "undefined" && __IS_LOCAL__) ? "" : "/flashcard";

const Callbacks: Array<(route: IRoute) => void> = [];

export interface IRoute {
    component: typeof HomeRoute | null;
    title: string;
    href: string;
    props?: Record<string, unknown>;
}

const RouteArray = [
    { href: "/"        , component: HomeRoute, title: "Home" },
    { href: "/404"     , component: NotFoundRoute, title: "404" },

    { href: "/learn"   , component: LearnRoute, title: "Learn" },
];

export const Routes: Record<string, IRoute> = RouteArray.reduce(
    (collection: Record<string, IRoute>, route) => {
        collection[route.href] = route;
        return collection;
    },
    {},
);

let CurrentRoute: IRoute =
    Routes[globalThis.location.pathname.replace(BASE_URL, "")] ?? Routes["/404"];

export function GetCurrentParams(): { [key: string]: string } {
    const searchParams = new URLSearchParams(globalThis.location.search);
    const params: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

export function Navigate(path: string) {
    const realPath = path.split("?")[0];

    globalThis.history.pushState({}, "", BASE_URL + path);
    CurrentRoute = Routes[realPath] ?? Routes["/404"];
    Callbacks.forEach((callback) => callback(CurrentRoute));
}

export function getCurrentRoute(): IRoute {
    return CurrentRoute;
}

export function onRouteChange(callback: (route: IRoute) => void) {
    Callbacks.push(callback);
}

globalThis.addEventListener("popstate", () => {
    const path = globalThis.location.pathname.replace(BASE_URL, "");
    CurrentRoute = Routes[path] ?? Routes["/404"];
    Callbacks.forEach((callback) => callback(CurrentRoute));
});
