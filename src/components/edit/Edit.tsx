import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../services";
import { showRoute } from "../../services/thunk/route";
import { useLocation } from "react-router-dom";
import { saveRoute } from "../../services/thunk/saveRoute";

const Edit = () => {
  const message = useAppSelector((store) => store.routeLocal.message);
  const isAuth = useAppSelector((s) => s.profile.isAuth);
  const notes = useAppSelector((store) => store.note.notes);
  const { isPending, routeInfo, errorMessage } = useAppSelector(
    (store) => store.route
  );

  const dispatch = useAppDispatch();
  const location = useLocation();
  const name = "test";
  useEffect(() => {
    console.log("call useEffect");
    if (!isPending && !routeInfo && notes) {
      console.log("NOTES", notes);
      dispatch(showRoute(notes));
      dispatch(saveRoute({ name: name, points: notes }));
      console.log("msg", message);
    }
  }, [notes]);

  function handleClick() {
    // dispatch(saveCard())
    // localhost POST /api/card
    // data: TUserCard[]
    // set user card to redux
    // +
    // /me
    // data: TUserCard[]
    // set user card to redux in the same field
    if (notes) dispatch(saveRoute({ name: name, points: notes }));
  }

  if (!notes?.length && isAuth) return <p>Выбери, точки. Пожалуйста</p>;
  if (errorMessage) return <p>{errorMessage}</p>;
  // card preview
  return isPending && isAuth ? (
    <div className="temp">ЗагрузОчка</div>
  ) : isAuth ? (
    <div className="temp">
      <p>{routeInfo?.[0].ui_total_duration}</p>
      <button onClick={handleClick}>Сохранить</button>
    </div>
  ) : (
    <div>Войдите в аккаунт</div>
  );
};

export default Edit;
