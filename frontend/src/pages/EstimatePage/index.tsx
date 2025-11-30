import css from "./index.module.scss";
import { EstimateBody } from "../../components/EstimateBody";
import { EstimateFooter } from "../../components/EstimateFooter";
import { EstimateHeader } from "../../components/EstimateHeader";
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
  });

  if (isError) {
    return <>Error: {error.message}</>;
  }
  if (isLoading || data === undefined) {
    return <>Loading...</>;
  }

  return (
    <div className={css["estimate-page"]}>
      <EstimateContextProvider estimate={data}>
        <EstimateHeader />
        <EstimateBody />
        <EstimateFooter />
      </EstimateContextProvider>
    </div>
  );
};
