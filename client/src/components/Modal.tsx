import { ReactNode } from "react";

interface ModalPorps {
  name: string;
  body: ReactNode;
}

function Modal({ name, body }: ModalPorps) {
  return (
    <dialog id={name} className="modal">
      <div className="modal-box">{body}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default Modal;
