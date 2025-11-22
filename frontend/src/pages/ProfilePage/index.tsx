import { useAppContext } from "../../contexts/AppContext/context";
import { routes } from "../routes";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAppContext();

  useEffect(() => {
    if (user === null) {
      navigate(routes.getSignInPage());
    }
  }, [user, navigate]);

  return (
    user !== null && (
      <>
        <h2>{user.email}</h2>
        <Link to={routes.getAboutPage()}>О приложении</Link>
        <br />
        <button onClick={signOut}>Выйти</button>
      </>
    )
  );
};
