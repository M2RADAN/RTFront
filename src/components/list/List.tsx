import { useAppSelector } from "../../services";

const List = () => {
  const lnglat = useAppSelector((store) => store.note.lnglat);
  if (lnglat)
    return (
      <div>
        list my ass {lnglat[0]} {lnglat[1]}
      </div>
    );
};

export default List;
