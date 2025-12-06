export type InputType = "text" | "number" | "date";

export type TypeMap = {
  text: string;
  number: number;
  date: Date;
};

export interface PropsI<T extends InputType, K extends object> {
  type: T;
  item: K;
  attr: keyof {
    [P in keyof K as K[P] extends TypeMap[T] ? P : never]: K[P];
  };
  onSave: (key: string, value: unknown) => void;
  className?: string;
  disabled?: boolean;
}
