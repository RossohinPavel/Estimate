import css from "./index.module.scss";
import { AddEstimateForm } from "../../components/AddEstimateForm";
import { useState } from "react";


export const EstimatesPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <div>
      <div className={css.actions}>
        <button onClick={() => setShowForm(!showForm)} disabled={showForm}>
          Добавить
        </button>

        <button onClick={() => alert("Здесь должен быть функцинал импорта")}>Импорт</button>
      </div>
      <div className={css["estimates-list"]}>
        {showForm && <AddEstimateForm setShowForm={setShowForm} />}
        <div>Тест 1</div>
        <div>Тест 2</div>
      </div>
    </div>
  );
};
