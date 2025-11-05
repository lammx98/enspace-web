// Server-side polyfills that must run early during SSR.
// This file ensures `globalThis.crypto.randomUUID` exists on the server.
// It prefers Node's native crypto.randomUUID if available, otherwise falls
// back to a safe JS UUID v4 generator.

// Only run on the server
if (typeof window === "undefined") {
  const anyGlobal: any = globalThis as any;

  anyGlobal.crypto = anyGlobal.crypto ?? {};

  if (typeof anyGlobal.crypto.randomUUID !== "function") {
    // Try Node's crypto module first (may or may not provide randomUUID depending on Node version)
    try {
      // Use require to avoid ESM/top-level import issues in some runtimes
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const nodeCrypto = require("crypto");
      if (typeof nodeCrypto.randomUUID === "function") {
        anyGlobal.crypto.randomUUID = () => nodeCrypto.randomUUID();
      } else {
        // Fallback to a simple UUID v4 implementation
        anyGlobal.crypto.randomUUID = () => {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          });
        };
      }
    } catch (err) {
      // If require fails for some reason, still provide the fallback implementation
      anyGlobal.crypto.randomUUID = () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      };
    }
  }
}
