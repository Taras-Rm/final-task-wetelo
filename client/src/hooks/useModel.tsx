export interface ModalProps {
  name: string;
  close: () => void;
  open: () => void;
}

const useModal = (name: string): ModalProps => {
  const close = () =>
    (document.getElementById(name) as HTMLDialogElement).close();

  const open = () =>
    (document.getElementById(name) as HTMLDialogElement).showModal();

  return {
    name,
    close,
    open,
  };
};

export default useModal;
