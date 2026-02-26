import { TopicDto } from "@/api/enspace-content";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = {
   activeTopic: TopicDto | undefined;
   setActiveTopic: (by: TopicDto | undefined) => void;
   destroy: () => void;
};

export const useAppStore = create<AppState>()(
   persist(
      (set) => ({
         activeTopic: undefined,
         setActiveTopic(by) {
            set(() => ({ activeTopic: by }));
         },
         destroy() {
            localStorage.removeItem('enspace.state');
         },
      }),
      {
         name: "enspace.state",
      }
   )
);
