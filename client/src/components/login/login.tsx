import React from "react";
import "./login.scss";
import {CustomInput} from "../ui/custom-input/custom-input";
import {Form, Formik} from "formik";
import {TLoginContainerProps, withLogin} from "../../hoc/login/with-login";

export const Login = React.memo(function(p: TLoginProps & TLoginContainerProps) {

  return <div className={`${p.className || ""} login`}>
    <Formik initialValues={p.initialValues}
      validationSchema={p.validationSchema}
      onSubmit={(values) => p.login(values)}>
      <Form className="login__container">
        <div className="login__header">
          <div className="login__row login__row--row-c">
            <div className="login__col">
              <div className="login__logo-wrapper">
                <div className="login__logo logo"></div>
                <div className="login__header-title text">Messenger</div>
              </div>
            </div>

            <div className="login__col login__col--col-r">
              <button className="login__next next-button" type="submit">Next</button>
            </div>
          </div>
        </div>
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
        </div>
      </Form>
    </Formik>
  </div>;
});

export const LoginContainer = withLogin<TLoginProps>(Login);

type TLoginProps = {
  className?: string
}
