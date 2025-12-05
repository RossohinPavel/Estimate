export type AutoSaveInputProps = {
  item: Record<string, unknown>;
  attr: string;
  onSave: (key: string, value: string) => void;
  className?: string;
  type?: "text" | "number";
  disabled?: boolean;
};
