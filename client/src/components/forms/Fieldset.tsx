import { ErrorMessage } from "formik";
import { ReactNode } from "react";

interface FieldsetProps {
  label: string;
  name: string;
  inputComponent: ReactNode;
}

function Fieldset({ label, name, inputComponent }: FieldsetProps) {
  return (
    <div className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      {inputComponent}
      <label className="label">
        <ErrorMessage
          name={name}
          component="span"
          className="label-text-alt text-red-500"
        />
      </label>
    </div>
  );
}

export default Fieldset;
