import type { PropsI, InputType } from "./types";
import React, { useCallback, useEffect, useState } from "react";


const AutoSaveInputC = <T extends InputType, K extends object>(props: PropsI<T, K>) => {
  const { type, item, attr, onSave, className, disabled } = props;

  const [initialValue, setInitialValue] = useState(item[attr]);

  const [changedValue, setChangedValue] = useState(initialValue);

  useEffect(() => {
    if (initialValue === changedValue) {
      return;
    }
    const timer = setTimeout(() => {
      onSave(attr as string, changedValue);
      setInitialValue(changedValue);
    }, 1000);
    return () => clearTimeout(timer);
  }, [changedValue, attr, onSave, initialValue, setInitialValue]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = null;
      if (type === "text") {
        value = e.target.value;
      } else if (type === "number") {
        value = e.target.valueAsNumber;
      }
      // @ts-expect-error - Пока не знаю, как тут вывести правильный тип.
      setChangedValue(value);
    },
    [type, setChangedValue]
  );

  return (
    <input
      type={type === undefined ? "text" : type}
      className={className}
      defaultValue={initialValue as string}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export const AutoSaveInput = React.memo(AutoSaveInputC) as typeof AutoSaveInputC;
