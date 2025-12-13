import { EstimateItem } from "../EstimateItem";
import css from "./index.module.scss";


export const EstimateSection = () => {
  return (
    <div className={css.section}>
      <div className={css.header}>
        <div className={css.name}>
          <input type="text" value={"Название раздела"} />
        </div>
        <div className={css.filler}></div>
        <div className={css.actions}>
          <button>+</button>
          <button>{"^"}</button>
          <button>{"˅"}</button>
          <button>x</button>
        </div>
      </div>
      <EstimateItem />
      <EstimateItem />
      <div className={css.footer}>
        <div className={css["section-amount"]}>Итого по разделу</div>
        <div className={css["material-amount"]}>10</div>
        <div className={css["material-amount"]}>14</div>
        <div className={css["total-amount"]}>16</div>
        <div className={css["total-amount"]}>Примечания</div>
      </div>
    </div>
  );
};
