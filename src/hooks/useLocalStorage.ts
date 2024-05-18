import { useCallback, useEffect, useState } from "react";
import { localStorage } from "../services/chromeStorage";

/**
 * Basic hook for storage
 */
export default function useLocalStorage(key: string, initialValue: any) {
  const [INITIAL_VALUE] = useState(() => {
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });
  const [state, setState] = useState(INITIAL_VALUE);
  const [isPersistent, setIsPersistent] = useState(true);
  const [error, setError] = useState("");
  const [isInitialStateResolved, setIsInitialStateResolved] = useState(false);

  useEffect(() => {
    localStorage
      .get(key, INITIAL_VALUE)
      .then((res) => {
        setState(res);
        setIsPersistent(true);
        setError("");
      })
      .catch((error) => {
        setIsPersistent(false);
        setError(error);
      })
      .finally(() => {
        setIsInitialStateResolved(true);
      });
  }, [key, INITIAL_VALUE]);

  const updateValue = useCallback(
    (newValue) => {
      const toStore =
        typeof newValue === "function" ? newValue(state) : newValue;
      localStorage
        .set(key, toStore)
        .then(() => {
          setIsPersistent(true);
          setError("");
        })
        .catch((error) => {
          // set newValue to local state because chrome.storage.onChanged won't be fired in error case
          setState(toStore);
          setIsPersistent(false);
          setError(error);
        });
    },
    [key, state]
  );

  useEffect(() => {
    const onChange = (changes, areaName) => {
      if (areaName === localStorage._area && key in changes) {
        const change = changes[key];
        const isValueStored = "newValue" in change;
        // only set the new value if it's actually stored (otherwise it'll just set undefined)
        if (isValueStored) {
          setState(change.newValue);
        } else {
          setState(INITIAL_VALUE);
        }
        setIsPersistent(isValueStored);
        setError("");
      }
    };
    chrome.storage.onChanged.addListener(onChange);
    return () => {
      chrome.storage.onChanged.removeListener(onChange);
    };
  }, [key]);

  return [state, updateValue, isPersistent, error, isInitialStateResolved];
}
