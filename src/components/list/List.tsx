import { useAppSelector } from "../../services";
import "./List.css";
const List = () => {
  const lnglat = useAppSelector((store) => store.note.lnglat);
  const notes = useAppSelector((store) => store.note.notes);
  if (lnglat && notes)
    return (
      <div className="temp">
        <p>
          {notes.fPoint[0]} {notes.fPoint[1]}
        </p>
        <p>
          {notes.sPoint[0]} {notes.sPoint[1]}
        </p>
        <p>
          {notes.tPoint[0]} {notes.tPoint[1]}
        </p>
      </div>
    );
};

export default List;
