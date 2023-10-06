import { create } from "zustand";
type State = {
  accessToken: string;
};

type Actions = {
  setAccessToken: (accessToken: string) => void;
  // getAccessToken: () => string;
  clearAccessToken: () => void;
};

const useAccessToken = create<State & Actions>((set) => ({
  accessToken: "",
  setAccessToken: (accessToken: string) => set({ accessToken }),
  clearAccessToken: () => set({ accessToken: "" }),
}));

export default useAccessToken;
