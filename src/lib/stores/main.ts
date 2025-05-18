import { writable } from "svelte/store";

export const selectedPage = writable("home");
export const currentVersion = writable(null);
export const latestVersion = writable(null);
