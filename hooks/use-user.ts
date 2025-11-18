import { create } from 'zustand';

type UserState = {
   user: any;
   setUser: (by: any) => void;
};

export const useUserStore = create<UserState>()((set) => ({
   user: undefined,
   setUser(by) {
      set(() => ({ user: by }));
   },
}));
