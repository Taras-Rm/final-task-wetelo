import { Field, Form, Formik } from "formik";
import PageWrapper from "../components/PageWrapper";
import { Link, useNavigate } from "react-router-dom";
import { RegistrationT } from "../types/type";
import { useState } from "react";
import { useAppDispatch } from "../state";
import { registration } from "../state/auth";
import { toast } from "react-toastify";
import { registrationValidationSchema } from "../components/forms/validatators/auth";
import Fieldset from "../components/forms/Fieldset";
import Button from "../components/common/Button";

function RegistrationPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
  };

  const handleRegistration = async (data: RegistrationT) => {
    try {
      setIsLoading(true);

      await dispatch(registration(data)).unwrap();

      toast.success("You are registered!");
      navigate("/login");
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="card bg-neutral shadow-lg">
        <Formik
          initialValues={initialValues}
          onSubmit={handleRegistration}
          validationSchema={registrationValidationSchema}
        >
          <Form>
            <div className="card-body">
              <h2 className="card-title text-4xl font-bold">
                Register a new account
              </h2>

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

              {/* Password */}
              <Fieldset
                name="password"
                label="Password"
                inputComponent={
                  <Field
                    name="password"
                    placeholder="Password"
                    type="password"
                    className="form-control w-full input input-bordered"
                  />
                }
              />

              <Button isLoading={isLoading} type="submit">
                Registration
              </Button>

              <div className="text-center mt-4">
                Already have an account?
                <Link to={"/login"} className="ml-2 link">
                  Login
                </Link>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </PageWrapper>
  );
}

export default RegistrationPage;
