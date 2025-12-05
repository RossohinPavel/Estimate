import css from "./index.module.scss";
import { useEstimateContext } from "../../contexts/EstimateContext/context";
import { AutoSaveInput } from "../AutoSaveInput";
import { useCallback } from "react";


export const EstimateHeader = () => {
  const { estimate } = useEstimateContext();

  const updateEstimateMetaInfo = useCallback((key: string, value: string) => {
    const data = { [key]: value };
    console.info("[Debounced] - Attr updated", data);
  }, []);

  return (
    <div className={css["estimate-header"]}>
      <div className={css.about}>
        <div>О смете</div>
        <textarea
          className={css.textarea}
          placeholder="Тут обычно бывает: Приложение к договору № 12345 от 1.2.2025"
          disabled
        />
      </div>
      <div className={css["agree-approved"]}>
        <div className={css.line}>
          <div>Согласовано</div>
          <input disabled></input>
        </div>
        <div className={css.line}>
          <div>Утвреждено</div>
          <input disabled></input>
        </div>
      </div>
      <div>
        <div className={css.meta}>
          <div>Смета</div>
          <AutoSaveInput item={estimate} attr="title" onSave={updateEstimateMetaInfo} />
        </div>
        <div className={css.meta}>
          <div>Объект</div>
          <input type="text" defaultValue="" />
        </div>
        <div className={css.meta}>
          <div>Основание</div>
          <input type="text" defaultValue="" />
        </div>
        <div className={css.meta}>
          <div>Сметная стоимость</div>
          <div>12345</div>
        </div>
        <div className={css.meta}>
          <div>Дата составления</div>
          <div>{estimate.updatedAt.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};
