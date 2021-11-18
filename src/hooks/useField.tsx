import { useState } from "react";

export const useField = (name: string, type: React.HTMLInputTypeAttribute) => {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const clearState = () => {
    setValue("");
  };

  return {
    name,
    type,
    value,
    onChange,
    clearState,
  };
};
