import css from "./index.module.scss";
import { useAppContext } from "../../contexts/AppContext/context";
import { routes } from "../../pages";
import { useCallback } from "react";
import { Outlet, NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";


export const Layout = () => {
  const { user } = useAppContext();

  const getActiveStyle = useCallback(({ isActive }: NavLinkRenderProps) => {
    return isActive ? css["link-active"] : "";
  }, []);

  return (
    <>
      <div className={css.layout}>
        <div className={css.side}>
          <NavLink to={routes.getMainPage()} className={getActiveStyle}>
            Главная
          </NavLink>
          <NavLink to={routes.getEstimatesPage()} className={getActiveStyle}>
            Сметы
          </NavLink>
          <NavLink to={routes.getTemplatesPage()} className={getActiveStyle}>
            Шаблоны
          </NavLink>
        </div>
        <div className={css.side}>
          {user === null ? (
            <NavLink to={routes.getSignInPage()} className={getActiveStyle}>
              Войти
            </NavLink>
          ) : (
            <NavLink to={routes.getProfilePage()} className={getActiveStyle}>
              {user.email}
            </NavLink>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
