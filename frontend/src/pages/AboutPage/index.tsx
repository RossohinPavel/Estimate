import { apiClient } from "../../libs/apiClient";
import { useQuery } from "@tanstack/react-query";


export const AboutPage = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["appUpdates"],
    queryFn: apiClient.getAppUpdates,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  if (isLoading || data === undefined) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error: {error.message}</>;
  }

  return (
    <div>
      <h2>Последние обновления приложения</h2>
      {data?.map((info) => (
        <div key={info.id}>
          <h3>
            {info.created_at.toLocaleDateString()} - {info.title}
          </h3>
          <p>{info.content}</p>
        </div>
      ))}
    </div>
  );
};
