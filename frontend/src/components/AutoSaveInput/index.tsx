import type { AutoSaveInputProps } from "./types";
import React, { useEffect, useState } from "react";


const AutoSaveInputC = (props: AutoSaveInputProps) => {
  const { item, attr, onSave, className, type, disabled } = props;

  const initialValue = item[attr] as string;
  const [value, setValue] = useState(initialValue);

  const [changedValue, setChangedValue] = useState(value);

  useEffect(() => {
    if (value === changedValue) {
      return;
    }
    const timer = setTimeout(() => {
      onSave(attr, changedValue);
      setValue(changedValue);
    }, 1000);

    return () => clearTimeout(timer);
  }, [changedValue, attr, onSave, value, setValue]);

  return (
    <input
      type={type === undefined ? "text" : type}
      className={className}
      defaultValue={value as string}
      onChange={(e) => setChangedValue(e.target.value)}
      disabled={disabled}
    />
  );
};

export const AutoSaveInput = React.memo(AutoSaveInputC);
