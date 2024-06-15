import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import "./List.css";
import { showRoute } from "../../services/thunk/route";

const List = () => {
  const notes = useAppSelector((store) => store.note.notes);
  const { isPending, routeInfo, errorMessage } = useAppSelector(
    (store) => store.route
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("call useEffect");
    if (!isPending && !routeInfo && notes) {
      console.log("NOTES", notes);
      dispatch(showRoute(notes));
    }
  }, [notes]);

  function handleClick() {
    // dispatch(saveCard()).then(() => dispatch(getUser()))
  }

  if (!notes?.length) return <p>Выбери, блять, точки. Пожалуйста</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return isPending ? (
    <div className="temp">ЗагрузОчка</div>
  ) : (
    <div className="temp">
      <p>{routeInfo?.[0].ui_total_duration}</p>
      <button onClick={handleClick}>Сохранить</button>
    </div>
  );
};

export default List;
