import css from "./index.module.scss";
import { AddEstimateForm } from "../../components/AddEstimateForm";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../core/apiClient";
import { useAppContext } from "../../contexts/AppContext/context";


export const EstimatesPage = () => {

  const { user } = useAppContext();

  const [showForm, setShowForm] = useState<boolean>(false);

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["estimates"],
    queryFn: apiClient.getEstimates,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: false,
  });

  const estimatesList = useMemo(() => {
    if ( isError ) {
      return <>Error: {error.message}</>;
    };
    if ( isLoading || data === undefined) {
      return <>Loading...</>;
    };
    return data.map(estimate => (
      <div key={estimate.id}>
        <h3>{estimate.title}</h3>
        <p>{estimate.createdAt.toLocaleDateString()}</p>
      </div>
    ));
  }, [data, isLoading, error, isError])

  if ( user === null ) {
    return <>Зарегистрируйтесь, чтобы пользоваться приложением.</>
  }

  return (
    <div>
      <div className={css.actions}>
        <button onClick={() => setShowForm(!showForm)} disabled={showForm}>
          Добавить
        </button>

        <button onClick={() => alert("Здесь должен быть функцинал импорта")}>Импорт</button>
      </div>
      <div className={css["estimates-list"]}>
        {showForm && <AddEstimateForm setShowForm={setShowForm} refetch={refetch} />}
        {estimatesList}
      </div>
    </div>
  );
};
