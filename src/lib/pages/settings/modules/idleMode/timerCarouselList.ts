export const timerValues = ["∞", "15m", "30m", "1h", "1.5h", "2h"] as const;

export const timerValueToSecondsAmount = (timerValue: typeof timerValues[number]) => {
  switch (timerValue) {
    case "∞": return null;
    case "15m": return 900;
    case "30m": return 1800;
    case "1h": return 3600;
    case "1.5h": return 5400;
    case "2h": return 7200;
    default: throw `unknown timerValue - ${timerValue}`;
  }
};
