import activateModal from "./globalContext";
import { useContext } from "react";

export default function useObjectContext() {
  const modalContext = useContext(activateModal);
  return modalContext;
}
