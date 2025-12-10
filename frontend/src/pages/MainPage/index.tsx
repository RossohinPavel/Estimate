import { AppLatestInfo } from "./AppLatestInfo";
import css from "./index.module.scss";
import { LastEditedEstimates } from "./LastEditedEstimates";
import { useAppContext } from "../../contexts/AppContext/context";


export const MainPage = () => {
  const { user } = useAppContext();

  return (
    <div className={css["main-page"]}>
      <div className={css.tabs}>
        <button>Последние</button>
        <button>Избранные</button>
      </div>
      {user !== null && (
        <>
          <LastEditedEstimates />
          <hr />
        </>
      )}
      <AppLatestInfo />
    </div>
  );
};
