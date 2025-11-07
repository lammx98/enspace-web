import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = {
   activeTopic: string | undefined;
   setActiveTopic: (by: string | undefined) => void;
};

export const useAppStore = create<AppState>()(
   persist(
      (set) => ({
         activeTopic: undefined,
         setActiveTopic(by) {
            set(() => ({ activeTopic: by }));
         },
      }),
      {
         name: "enspace.state",
      }
   )
);
