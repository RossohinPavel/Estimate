import { useMemo } from "react";
import { useAppContext } from "../../contexts/AppContext/context";
import { routes } from "../../pages";
import { Link, Outlet } from "react-router-dom";


export const Layout = () => {
  const { user } = useAppContext();

  const profileSide = useMemo(() => {
    if ( user === null ) {
      return <Link to={routes.getSignInPage()}>Войти</Link>;
    } else {
      return <Link to={routes.getProfilePage()}>{user.email}</Link>
    }
  }, [user])

  return (
    <div>
      <span>
        <Link to={routes.getMainPage()}>Главная</Link>
      </span>
      <span> | </span>
      <span>
        <Link to={routes.getEstimatesPage()}>Мои сметы</Link>
      </span>
      <span> | </span>
      <span>
        <Link to={routes.getTemplatesPage()}>Шаблоны</Link>
      </span>
      <span> | </span>
      <span>
        <Link to={routes.getAboutPage()}>О приложении</Link>
      </span>
      <span> | </span>
      <span>{profileSide}</span>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
