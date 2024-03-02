import { createTimer } from "@solid-primitives/timer";

import { FIVE_MINUTES_IN_MS } from "/src/scripts";

const CLASS = "brightness-75";

const setDarkMode = () => {
  const hours = new Date().getHours();

  hours >= 22 || hours <= 8
    ? document.body.classList.add(CLASS)
    : document.body.classList.remove(CLASS);
};

export const createDarkModeTimer = () => {
  setDarkMode();

  createTimer(setDarkMode, FIVE_MINUTES_IN_MS, setInterval);
};
