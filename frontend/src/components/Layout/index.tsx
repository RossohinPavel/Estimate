import { Link, Outlet } from "react-router-dom";
import { routes } from "../../pages";

export const Layout = () => {
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
            <span>Профиль</span>
            <hr />
            <div>
                <Outlet />
            </div>
        </div>
    );
}