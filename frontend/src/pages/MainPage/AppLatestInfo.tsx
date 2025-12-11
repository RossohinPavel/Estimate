import { apiClient } from "../../core/apiClient";
import { useQuery } from "@tanstack/react-query";


export const AppLatestInfo = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["appLatestUpdate"],
    queryFn: apiClient.getAppLatestUpdate,
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
      <hr />
      <div key={data!.id}>
        <h3>
          {data!.createdAt.toLocaleDateString()} - {data!.title}
        </h3>
        <p>{data!.content}</p>
      </div>
    </div>
  );
};
