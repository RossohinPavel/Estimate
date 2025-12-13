import css from "./index.module.scss";


export const EstimateItem = () => {
  return (
    <div className={css.item}>
      <div className={css.number}>1</div>
      <div className={css.name}>Позиция сметы</div>
      <div className={css.meas}>шт</div>
      <div className={css.meas}>3</div>
      <div className={css.material}>
        <div>4</div>
        <div>5</div>
      </div>
      <div className={css.material}>
        <div>6</div>
        <div>7</div>
      </div>
      <div className={css.amount}>8</div>
      <div className={css.amount}>Примечание</div>
    </div>
  );
};
