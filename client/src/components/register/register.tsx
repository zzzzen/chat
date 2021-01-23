import React from "react";
import {TRegisterContainerProps, withRegister} from "../../hoc/authorization/with-register";
import {Form, Formik} from "formik";
import {CustomInput} from "../ui/custom-input/custom-input";
import {FormHeader} from "../form-header/form-header";

export const Register = React.memo((p: TRegisterProps & TRegisterContainerProps) => {
  return <div className={`${p.className || ""} register`}>
    <Formik initialValues={p.initialValues}
      validationSchema={p.validationSchema}
      onSubmit={(values) => p.register(values)}>
      <Form className="register__container">
        <FormHeader className="register__header"/>
        <div className="login__form form">
          <div className="form__row">
            <div className="form__col">
              <div className="form__title title">Sign up</div>
            </div>
          </div>
          <div className="form__row">
            <div className="form__col">
              <div className="form__text text">
                Please fill out the form.
              </div>
            </div>
          </div>
          <div className="form__row">
            <div className="form__col">
              <CustomInput className="form__input"
                name="name"
                placeholder="Name"/>
            </div>

            <div className="form__col">
              <CustomInput className="form__input"
                name="surname"
                placeholder="Surname"/>
            </div>

            <div className="form__col">
              <CustomInput className="form__input"
                name="patronymic"
                placeholder="Patronymic"/>
            </div>

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
                name="email"
                placeholder="Email"
                type="email"/>
            </div>

            <div className="form__col">
              <CustomInput className="form__input"
                name="password"
                placeholder="Password"
                type="password"/>
            </div>

            <div className="form__col">
              <CustomInput className="form__input"
                name="passwordConfirm"
                placeholder="Password confirm"
                type="password"/>
            </div>
          </div>
          <div className="form__row">
            <div className="form__col">
              <div className="form__text text">
                Has account — <span className="form__link link" onClick={p.onLoginClick}>login</span>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  </div>;
});

export const RegisterContainer = withRegister<TRegisterProps>(Register);

type TRegisterProps = {
  className?: string,
  onLoginClick: () => void
}