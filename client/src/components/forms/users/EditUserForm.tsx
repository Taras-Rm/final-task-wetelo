import { Field, Form, Formik } from "formik";
import { useState } from "react";
import Fieldset from "../Fieldset";
import { useAppDispatch, useAppSelector } from "../../../state";
import { UpdateUserT } from "../../../types/type";
import { updateUser } from "../../../state/users";
import { toast } from "react-toastify";
import { editUserValidationSchema } from "../validatators/users";
import Button from "../../common/Button";

interface EditUserForm {
  handleSave: () => void;
}

function EditUserForm({ handleSave }: EditUserForm) {
  const dispatch = useAppDispatch();
  const editUser = useAppSelector((state) => state.users.editUser);

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: editUser?.name || "",
    phone: editUser?.phone || "",
    email: editUser?.email || "",
  };

  const handleUpdateUser = async (id: number, data: UpdateUserT) => {
    try {
      setIsLoading(true);

      await dispatch(updateUser({ id, data })).unwrap();

      toast.success("User updated!");

      handleSave();
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  if (!editUser) {
    return null;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleUpdateUser(editUser.id, values)}
      enableReinitialize
      validationSchema={editUserValidationSchema}
    >
      <Form>
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">Edit user</h2>

          {/* Name */}
          <Fieldset
            name="name"
            label="Name"
            inputComponent={
              <Field
                name="name"
                placeholder="Name"
                type="text"
                className="form-control w-full input input-bordered"
              />
            }
          />

          {/* Phone */}
          <Fieldset
            name="phone"
            label="Phone"
            inputComponent={
              <Field
                name="phone"
                placeholder="Phone"
                type="text"
                className="form-control w-full input input-bordered"
              />
            }
          />

          {/* Email */}
          <Fieldset
            name="email"
            label="Email"
            inputComponent={
              <Field
                name="email"
                placeholder="Email"
                type="email"
                className="form-control w-full input input-bordered"
              />
            }
          />

          <Button isLoading={isLoading} type="submit">
            Update
          </Button>
        </div>
      </Form>
    </Formik>
  );
}

export default EditUserForm;
