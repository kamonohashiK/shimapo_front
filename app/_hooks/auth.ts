import { getSelfProfile } from "../_api/endpoints/auth";
import { setLoginInfo } from "../_store/slices/userSlice";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  // 取得したユーザー情報をReduxに保存する
  const setAuth = async () => {
    const user = await getSelfProfile();
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

  return { setAuth };
};
