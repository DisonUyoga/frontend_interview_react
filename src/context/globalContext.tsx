import { createContext } from "react";

interface GlobalContext {
  loadObjects: boolean;
  setLoadObjects: (toggle: boolean) => void;
}

const activateModal = createContext<GlobalContext>({
  loadObjects: false,
  setLoadObjects: () => {},
});

export const ModalProvider = activateModal.Provider;
export default activateModal;
