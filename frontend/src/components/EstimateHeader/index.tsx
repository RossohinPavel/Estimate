import css from "./index.module.scss";
import { useEstimateContext } from "../../contexts/EstimateContext/context";


export const EstimateHeader = () => {
  const { estimate } = useEstimateContext();

  return (
    <div className={css["estimate-header"]}>
      <div className={css.about}>
        <div>О смете</div>
        <textarea
          className={css.textarea}
          placeholder="Тут обычно бывает: Приложение к договору № 12345 от 1.2.2025"
        />
      </div>
      <div className={css["agree-approved"]}>
        <div className={css.line}>
          <div>Согласовано</div>
          <input></input>
        </div>
        <div className={css.line}>
          <div>Утвреждено</div>
          <input></input>
        </div>
      </div>
      <div>
        <div className={css.meta}>
          <div>Смета</div>
          <div>{estimate.title}</div>
        </div>
        <div className={css.meta}>
          <div>Объект</div>
          <div>Тут описание объекта</div>
        </div>
        <div className={css.meta}>
          <div>Основание</div>
          <div>Тут описание основания</div>
        </div>
        <div className={css.meta}>
          <div>Сметная стоимость</div>
          <div>Берем мемоизированние значение из контекста</div>
        </div>
        <div className={css.meta}>
          <div>Дата составления</div>
          <div>{estimate.updatedAt.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};
