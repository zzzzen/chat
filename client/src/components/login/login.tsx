import React from "react";
import "./login.scss";
import {CustomInput} from "../ui/custom-input/custom-input";
import {Form, Formik} from "formik";
import {TAuthorizationContainerProps, withAuthorization} from "../../hoc/authorization/with-authorization";
import {FormHeader} from "../form-header/form-header";

export const Login = React.memo((p: TAuthorizationProps & TAuthorizationContainerProps) => {

  return <div className={`${p.className || ""} login`}>
    <Formik initialValues={p.initialValues}
      validationSchema={p.validationSchema}
      onSubmit={(values) => p.login(values)}>
      <Form className="login__container">
        <FormHeader className="login__header"/>
        <div className="login__form form">
          <div className="form__row">
            <div className="form__col">
              <div className="form__title title">Sign in</div>
            </div>
          </div>
          <div className="form__row">
            <div className="form__col">
              <div className="form__text text">
                Please enter your full phone number and password.
              </div>
            </div>
          </div>
          <div className="form__row">
            <div className="form__col">
              <CustomInput className="form__input"
                name="phone"
                placeholder="Phone"
                type="tel"
                isMasked={true}
                formatType="phone"/>
            </div>

            <div className="form__col">
              <CustomInput className="form__input"
                name="password"
                placeholder="Password"
                type="password"/>
            </div>
          </div>

          <div className="form__row">
            <div className="form__col">
              <div className="form__text text">
                No account — <span className="form__link link" onClick={p.onRegisterClick}>register</span>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  </div>;
});

export const LoginContainer = withAuthorization<TAuthorizationProps>(Login);

type TAuthorizationProps = {
  className?: string,
  onRegisterClick: () => void
}
