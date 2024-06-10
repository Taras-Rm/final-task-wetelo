import { Field, Form, Formik } from "formik";
import { useState } from "react";
import Fieldset from "../Fieldset";
import { useAppDispatch, useAppSelector } from "../../../state";
import { UpdateAdvertT } from "../../../types/type";
import { updateAdvert } from "../../../state/adverts";
import { toast } from "react-toastify";
import { editAdvertValidationSchema } from "../validatators/adverts";
import Button from "../../common/Button";

interface EditAdvertFormProps {
  handleSave: () => void;
}

function EditAdvertForm({ handleSave }: EditAdvertFormProps) {
  const dispatch = useAppDispatch();
  const editAdvert = useAppSelector((state) => state.adverts.editAdvert);

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    title: editAdvert?.title || "",
    description: editAdvert?.description || "",
    price: editAdvert?.price || 0,
  };

  const handleUpdateAdvert = async (id: number, data: UpdateAdvertT) => {
    try {
      setIsLoading(true);

      await dispatch(updateAdvert({ id, data })).unwrap();

      toast.success("Advert updated!");

      handleSave();
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  if (!editAdvert) {
    return null;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleUpdateAdvert(editAdvert.id, values)}
      enableReinitialize
      validationSchema={editAdvertValidationSchema}
    >
      <Form>
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">Edit advert</h2>

          {/* Title */}
          <Fieldset
            name="title"
            label="Title"
            inputComponent={
              <Field
                name="title"
                placeholder="Title"
                type="text"
                className="form-control w-full input input-bordered"
              />
            }
          />

          {/* Description */}
          <Fieldset
            name="description"
            label="Description"
            inputComponent={
              <Field
                name="description"
                placeholder="Description"
                type="text"
                className="form-control w-full textarea textarea-bordered textarea-sm"
              />
            }
          />

          {/* Price */}
          <Fieldset
            name="price"
            label="Price, $"
            inputComponent={
              <Field
                name="price"
                placeholder="Price"
                type="number"
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

export default EditAdvertForm;
