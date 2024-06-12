import { NAVIGATIONS } from "../../const/constants";
import { useAppSelector } from "../../services";
import HeaderLink from "../../ui/HeaderLink";

const Profile = () => {
  const user = useAppSelector((store) => store.profile.user);
  console.log(user);
  return (
    <div>
      <HeaderLink route={NAVIGATIONS.LOGIN}>{user?.email}</HeaderLink>
    </div>
  );
};

export default Profile;
