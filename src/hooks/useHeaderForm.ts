import { setActive, THeaderForms } from "../services/slices/navigation.slice";
import { useAppDispatch } from "../services";

export function useHeaderForm() {
  const dispatch = useAppDispatch();

  function openForm(type: THeaderForms) {
    dispatch(setActive(type));
  }

  return openForm;
}
