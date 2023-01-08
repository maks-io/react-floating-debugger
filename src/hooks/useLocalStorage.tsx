// source:
// https://usehooks.com/useLocalStorage/
import React, { useState } from "react";

// Hook
function useLocalStorage<T>(
  key: string,
  initialValue: T,
  expireAfterMilliseconds?: number
) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<{
    timestamp: number;
    data: T;
  }>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);

      // Parse stored json or if none return initialValue
      return item
        ? JSON.parse(item)
        : { timestamp: new Date().getTime(), data: initialValue };
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  const getValue = (): T | undefined => {
    if (expireAfterMilliseconds) {
      const passedMilliseconds: number =
        new Date().getTime() - storedValue.timestamp;
      if (passedMilliseconds > expireAfterMilliseconds) {
        setValue(initialValue);
        return initialValue;
      }
    }

    return storedValue?.data;
  };

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue?.data) : value;

      const valueToStorePlusMetadata = {
        timestamp: new Date().getTime(),
        data: valueToStore,
      };

      // Save state
      setStoredValue(valueToStorePlusMetadata);
      // Save to local storage
      window.localStorage.setItem(
        key,
        JSON.stringify(valueToStorePlusMetadata)
      );
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [getValue, setValue] as const;
}

export default useLocalStorage;
