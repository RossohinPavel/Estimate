import { EstimateSection } from "./EstimateSection";
import css from "./index.module.scss";
import { TableHeader } from "./TableHeader";


export const EstimateBody = () => {
  return (
    <div className={css["estimate-body"]}>
      <div>
        <button>Добавить раздел</button>
      </div>
      <TableHeader />
      <EstimateSection />
      <EstimateSection />
    </div>
  );
};
