import { apiClient } from "../../core/apiClient";
import { useQuery } from "@tanstack/react-query";


export const MainPage = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["appLatestUpdate"],
    queryFn: apiClient.getAppLatestUpdate,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: false,
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error: {error.message}</>;
  }

  return (
    <div>
      <h2>Последнее обновлене</h2>
      <div key={data!.id}>
        <h3>
          {data!.createdAt.toLocaleDateString()} - {data!.title}
        </h3>
        <p>{data!.content}</p>
      </div>
    </div>
  );
};
