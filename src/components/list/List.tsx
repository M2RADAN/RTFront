import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import "./List.css";
import { showRoute } from "../../services/thunk/route";
import { findRoutes } from "../../services/thunk/findRoutes";

const List = () => {
  const { isPending, routes } = useAppSelector((store) => store.routeLocal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("call useEffect");
    if (!isPending && routes) {
      console.log("routes", routes);
    }
  });

  function handleClick() {
    // dispatch(saveCard()).then(() => dispatch(getUser()))
    dispatch(findRoutes());
  }
  return (
    <div className="temp">
      <button onClick={handleClick}>показать</button>
    </div>
  );
};

export default List;
