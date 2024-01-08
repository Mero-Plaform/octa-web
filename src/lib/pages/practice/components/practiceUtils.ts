import { practiceViewStore } from "../stores/practiceViewStore.js";

export const onSettings = () => {
  practiceViewStore.set("settings");
};

export const onPracticedWords = () => {
  practiceViewStore.set("practiced words");
};
