import { EstimateCardMini } from "./EstimateCard";
import css from "./index.module.scss";
import { apiClient } from "../../core/apiClient";
import { useQuery } from "@tanstack/react-query";


export const LastEditedEstimates = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["LatestEstimates"],
    queryFn: apiClient.getEstimates,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: false,
  });

  if (isError) {
    return <>Error: {error.message}</>;
  }

  if (isLoading || data === undefined) {
    return <>Loading...</>;
  }

  return (
    <div className={css.estimates}>
      {data.estimates.map((e) => (
        <EstimateCardMini estimate={e} />
      ))}
    </div>
  );
};
