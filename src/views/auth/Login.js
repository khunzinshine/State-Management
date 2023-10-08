import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useContext, useRef } from "react";

import { AuthContext } from "../../context/AuthContext";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const toast = useRef(null);
  const navigate = useNavigate();

  const { dispatch, loading } = useContext(AuthContext);

  const defaultUserName = process.env.REACT_APP_USERNAME;
  const defaultPassword = process.env.REACT_APP_PASSWORD;
  const defaultToken = process.env.REACT_APP_BASIC_TOKEN;

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    if (
      values.username === defaultUserName &&
      values.password === defaultPassword
    ) {
      dispatch({
        type: "LOGIN_START"
      });

      let authInfo = {
        token: defaultToken,
        expiredAt: new Date(Date.now() + 24 * 60 * 1000),
        user: values.username
      };

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: authInfo
      });

      navigate("/team/list");
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Username and Password Incorrect"
      });
    }
  };

  const SigninSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required")
  });

  return (
    <div style={{ marginTop: "10rem" }}>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={SigninSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <div className="flex align-items-center justify-content-center">
              <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                  <div className="text-900 text-3xl font-medium mb-3 mt-5">
                    Signin to App
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-900 font-medium mb-2"
                  >
                    Username
                  </label>
                  <InputText
                    id="username"
                    type="text"
                    autoComplete="username"
                    value={values.username}
                    onChange={handleChange}
                    validateOnly={values.password && !errors.password}
                    placeholder="Username"
                    className="w-full mb-3"
                  />
                  {errors.username && touched.username ? (
                    <div>{errors.username}</div>
                  ) : null}
                  <label
                    htmlFor="password"
                    className="block text-900 font-medium mb-2"
                  >
                    Password
                  </label>
                  <InputText
                    id="password"
                    type="password"
                    autoComplete="password"
                    validateOnly={values.password && !errors.password}
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full mb-3"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <div className="flex justify-content-center mt-4 mb-5">
                    <Button
                      label="Sign In"
                      type="submit"
                      loading={loading}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
