/**
 * useHydration - Hook to safely handle Zustand hydration in Next.js
 * 
 * This hook ensures that the store is fully hydrated before accessing its state,
 * preventing hydration mismatches between server and client.
 */

import { useEffect, useState } from 'react';

/**
 * Hook to check if the client has hydrated
 * Returns true only after the component has mounted on the client
 */
export function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}

/**
 * Hook to get a value safely with hydration check
 * Returns fallback value during SSR/hydration, actual value after hydration
 * 
 * @param getValue - Function to get the actual value
 * @param fallbackValue - Value to return during SSR/hydration
 * 
 * @example
 * ```ts
 * const user = useHydratedValue(
 *   () => useAuthStore.getState().user,
 *   null
 * );
 * ```
 */
export function useHydratedValue<T>(getValue: () => T, fallbackValue: T): T {
  const hydrated = useHydration();
  const [value, setValue] = useState<T>(fallbackValue);

  useEffect(() => {
    if (hydrated) {
      setValue(getValue());
    }
  }, [hydrated, getValue]);

  return hydrated ? value : fallbackValue;
}
