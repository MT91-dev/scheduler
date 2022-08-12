import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition function to change the mode
  const transition = (newMode, replace = false) => {
    let replaceHistory = [...history];
    let newHistory = [...history];

    if (replace) {
      setMode(newMode);
    } else {
      setMode(newMode);
      newHistory.push(newMode);
      setHistory(newHistory);
    }
  };

  // back function for returning to a previous mode
  const back = () => {
    let newHistory = [...history];
    newHistory.pop(mode);
    setHistory(newHistory);
    if (history.length > 1) {
      setMode(newHistory[(newHistory.length - 1)]);
    }
  };

  return { mode, transition, back }

}