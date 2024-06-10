import { Field, Form, Formik } from "formik";
import PageWrapper from "../components/PageWrapper";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../state/auth";
import { LoginT } from "../types/type";
import { useAppDispatch } from "../state";
import { useState } from "react";
import { toast } from "react-toastify";
import Fieldset from "../components/forms/Fieldset";
import Button from "../components/common/Button";
import { loginValidationSchema } from "../components/forms/validatators/auth";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (data: LoginT) => {
    try {
      setIsLoading(true);

      await dispatch(login(data))
        .unwrap()
        .then(() => {
          navigate("/adverts");
        });
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="card bg-neutral">
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={loginValidationSchema}
        >
          <Form>
            <div className="card-body">
              <h2 className="card-title text-4xl font-bold">
                Login to your account
              </h2>

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
                Login
              </Button>

              <div className="text-center mt-4">
                Don't have an account?
                <Link to={"/registration"} className="ml-2 link">
                  Registration
                </Link>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </PageWrapper>
  );
}

export default LoginPage;
