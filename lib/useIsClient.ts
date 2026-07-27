"use client";

import { useSyncExternalStore } from "react";

// The value never changes after hydration, so there is nothing to subscribe to.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `false` on the server and during hydration, `true` afterwards.
 *
 * Used to gate rendering that depends on browser-only state (stored theme,
 * platform detection) without a setState-in-effect or a hydration mismatch.
 */
export function useIsClient() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
