import { apiClient } from "../../libs/apiClient";

export const AboutPage = () => {
  apiClient.getAppLatestUpdate();
  apiClient.getAppUpdates();
  return <>Эта страничка о самом приложении</>;
};
