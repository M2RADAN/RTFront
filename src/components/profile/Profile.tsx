import { NAVIGATIONS } from "../../const/constants";
import { useAppSelector } from "../../services";
import HeaderLink from "../../ui/HeaderLink";
import "./Profile.css";
const Profile = () => {
	const user = useAppSelector((store) => store.profile.user);
	console.log(user);
	return (
		<div className='profile'>
			<div className='card'>
				<p>Ваша почта:</p>
				<p>{user?.email}</p>
			</div>
			<HeaderLink route={NAVIGATIONS.LOGIN}>Выйти</HeaderLink>
		</div>
	);
};

export default Profile;
