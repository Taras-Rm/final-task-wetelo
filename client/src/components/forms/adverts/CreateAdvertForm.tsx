import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useAppDispatch } from "../../../state";
import { CreateAdvertT } from "../../../types/type";
import { createAdvert } from "../../../state/adverts";
import { toast } from "react-toastify";
import Fieldset from "../Fieldset";
import { createAdvertValidationSchema } from "../validatators/adverts";
import Button from "../../common/Button";

interface CreateAdvertFormProps {
  handleSave: () => void;
}

function CreateAdvertForm({ handleSave }: CreateAdvertFormProps) {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    title: "",
    description: "",
    price: null,
  };

  const handleCreateAdvert = async (data: CreateAdvertT) => {
    try {
      setIsLoading(true);

      await dispatch(createAdvert(data)).unwrap();

      toast.success("Advert created!");

      handleSave();
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) =>
        handleCreateAdvert({ ...values, price: values.price || 0 })
      }
      validationSchema={createAdvertValidationSchema}
    >
      <Form>
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">Create advert</h2>

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
            Create
          </Button>
        </div>
      </Form>
    </Formik>
  );
}

export default CreateAdvertForm;
