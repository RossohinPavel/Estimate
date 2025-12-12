import css from "./index.module.scss";
import { EstimateBody } from "../../components/Estimate/Body";
import { EstimateFooter } from "../../components/Estimate/Footer";
import { EstimateHeader } from "../../components/Estimate/Header";
import { EstimateContextProvider } from "../../contexts/EstimateContext/provider";
import { apiClient } from "../../core/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";


export const EstimatePage = () => {
  const { estimateId } = useParams() as { estimateId: string };

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["estimate", estimateId],
    queryFn: async () => {
      return await apiClient.getEstimate(estimateId);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return <>Error: {error.message}</>;
  }
  if (isLoading || data === undefined) {
    return <>Loading...</>;
  }

  return (
    <div className={css["estimate-page"]}>
      <EstimateContextProvider data={data}>
        <div style={{ margin: "1rem" }}>
          <button>Экспортировать</button>
        </div>
        <EstimateHeader />
        <EstimateBody />
        <EstimateFooter />
      </EstimateContextProvider>
    </div>
  );
};
