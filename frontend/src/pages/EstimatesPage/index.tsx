import css from "./index.module.scss";
import { AddEstimateForm } from "../../components/AddEstimateForm";
import { useAppContext } from "../../contexts/AppContext/context";
import { apiClient } from "../../core/apiClient";
import type { UserDataSchemaType } from "../../core/schemas";
import { routes } from "../routes";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";


const EstimatesPageData = ({ user }: { user: UserDataSchemaType }) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["estimates", user],
    queryFn: apiClient.getEstimates,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: false,
  });

  const estimatesList = useMemo(() => {
    if (isError) {
      return <>Error: {error.message}</>;
    }
    if (isLoading || data === undefined) {
      return <>Loading...</>;
    }
    return data.map((estimate) => (
      <div key={estimate.id}>
        <h3>
          <NavLink to={routes.getEstimatePage(String(estimate.id))}>{estimate.title}</NavLink>
        </h3>
        <p>{estimate.createdAt.toLocaleDateString()}</p>
      </div>
    ));
  }, [data, isLoading, error, isError]);

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

export const EstimatesPage = () => {
  const { user } = useAppContext();

  return user !== null ? (
    <EstimatesPageData user={user} />
  ) : (
    <>Зарегистрируйтесь, чтобы пользоваться приложением.</>
  );
};
