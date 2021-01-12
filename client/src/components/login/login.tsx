import React, {useEffect, useState} from "react";
import "./login.scss";
import {TLoginContainer} from "./login-container";
import {MainLayout} from "../../layouts/main-layout";
import {CustomInput} from "../ui/custom-input/custom-input";
import {Form, Formik} from "formik";
import {CustomButton} from "../ui/custom-button/custom-button";
import {withLogin} from "../../hoc/login/with-login";

export const Login = React.memo(function(p: TLoginProps & TLoginContainer) {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(checkUser, []);

  function checkUser() {
    if (p.userInfo) p.getUser({id: p.userInfo.id});
  }

  return <Formik initialValues={p.initialValues}
    validationSchema={p.validationSchema}
    onSubmit={(values) => p.login(values)}>
    <Form className={`${p.className || ""} login`}>
      <div className="login__form form">
        <div className="form__row">
          <div className="form__col">
            <CustomInput className="form__input"
              name="phone"
              placeholder="телефон"/>
          </div>

          <div className="form__col">
            <CustomInput className="form__input"
              name="password"
              placeholder="password"/>
          </div>
        </div>
        <div className="form__row">
          <div className="form__col">
            <CustomButton className="form__button"
              children="Отправить"
              htmlType="submit"/>
          </div>
        </div>
      </div>
    </Form>
  </Formik>;
});

export const LoginContainer = withLogin<TLoginProps>(Login);

type TLoginProps = {
  className?: string
}
