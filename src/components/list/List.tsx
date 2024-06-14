import { useAppSelector } from "../../services";
import "./List.css";
const List = () => {
	const lnglat = useAppSelector((store) => store.note.lnglat);
	const notes = useAppSelector((store) => store.note.notes);

	if (lnglat && notes)
		if (notes.tPoint)
			return (
				<div className='temp'>
					<p>
						{notes.fPoint.lat} {notes.fPoint.lon}
					</p>
					<p>
						{notes.sPoint.lat} {notes.sPoint.lon}
					</p>

					<p>
						{notes.tPoint.lat} {notes.tPoint.lon}
					</p>
				</div>
			);
};

export default List;
