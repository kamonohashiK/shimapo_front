import { get } from "http";
import { getUserProfile } from "../_api/endpoints/auth";
import { setLoginInfo } from "../_store/slices/userSlice";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  // 取得したユーザー情報をReduxに保存する
  const setProfile = async () => {
    const user = await getUserProfile();
    if (user) {
      dispatch(
        setLoginInfo({
          loggedIn: true,
          userId: user.uid,
          displayName: user.displayName,
          photoUrl: user.photoURL,
        })
      );

      return true;
    } else {
      return false;
    }
  };
};
