import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.splice(history.length - 1, 1)
      setHistory([...history, newMode])
    }
    setHistory([...history, newMode]);
    setMode(newMode);
  };

  const back = () => {
    // Only change mode if it's not at initial page
    if (history.length > 1) {
      // Remove last entry from history array
      // Set mode back to the previous value
      history.splice(history.length - 1, 1);
      setMode(history[history.length - 1]);
    }
  };


  return { mode, transition, back };
}