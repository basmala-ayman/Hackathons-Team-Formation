import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // If value is a function then implement it and setStoredValue with it's return value if not just set the value given
      setStoredValue((prevValue) => {
        const valueToStore =
          typeof value === "function" ? value(prevValue) : value;
        return valueToStore;
      });
    } catch (error) {
      console.error("Error setting value:", error);
    }
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}
