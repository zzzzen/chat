import React, {useState} from "react";
import "./authorization.scss";
import {TAuthorizationContainerProps, withAuthorization} from "../../hoc/authorization/with-authorization";
import {MainLayout} from "../../layouts/main-layout/main-layout";
import {RegisterContainer} from "../register/register";
import {LoginContainer} from "../login/login";

export const Authorization = React.memo((p: TAuthorizationProps & TAuthorizationContainerProps) => {
  const [isRegister, setIsRegister] = useState(false);

  if (p.isChecking) return null;
  if (p.isChecked && p.isLogin) return <MainLayout/>;

  return <div className={`${p.className || ""} authorization`}>
    <div className="authorization__container">
      {isRegister ?
        <RegisterContainer className="authorization__register"
          onLoginClick={() => setIsRegister(false)}/> :
        <LoginContainer className="authorization__login"
          onRegisterClick={() => setIsRegister(true)}/>}
    </div>
  </div>;

});

export const AuthorizationContainer = withAuthorization<TAuthorizationProps>(Authorization);

type TAuthorizationProps = {
  className?: string
}
