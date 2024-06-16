import { NAVIGATIONS } from "../../const/constants";
import { useAppDispatch, useAppSelector } from "../../services";
import { logoutUser } from "../../services/thunk/logut";
import HeaderLink from "../../ui/HeaderLink";
import "./Profile.css";
const Profile = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(logoutUser());
  };
  const user = useAppSelector((store) => store.profile.user);
  console.log(user);
  return (
    <div className="profile">
      <div className="card">
        <p>Ваша почта:</p>
        <p>{user?.email}</p>
      </div>
      <HeaderLink onClick={handleClick} route={NAVIGATIONS.LOGIN}>
        Выйти
      </HeaderLink>
    </div>
  );
};

export default Profile;
