import css from "./TableHeader.module.scss";


export const TableHeader = () => {
  return (
    <div className={css["table-header"]}>
      <div className={css.number}>№ п/п</div>
      <div className={css.name}>Наименование работ и материалов</div>
      <div className={css.meas}>ед.изм.</div>
      <div className={css.meas}>Кол-во</div>
      <div className={css.material}>
        <div>Материалы</div>
        <div className={css.inner}>
          <div>Стоимость ед. изм.</div>
          <div>Всего (руб.)</div>
        </div>
      </div>
      <div className={css.material}>
        <div>Работа</div>
        <div className={css.inner}>
          <div>Стоимость ед. изм.</div>
          <div>Всего (руб.)</div>
        </div>
      </div>
      <div className={css.amount}>Всего (руб.)</div>
      <div className={css.amount}>Примечание</div>
    </div>
  );
};
