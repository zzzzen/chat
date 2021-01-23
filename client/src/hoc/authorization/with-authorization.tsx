import React, {useEffect, useRef, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import * as Yup from "yup";
import {TStore} from "../../store";
import {TDispatch, TResponseAction} from "../../types/common";
import {AGetUser, ALoginUser, ALogoutUser, TLoginUserData} from "../../actions/user";
import {MESSAGES} from "../../utils/messages";

const validationSchema = Yup.object({
  phone: Yup.string()
    .max(11, MESSAGES.maxLength(11))
    .min(11, MESSAGES.minLength(11))
    .required(MESSAGES.required),
  password: Yup.string()
    .min(6, MESSAGES.minLength(6))
    .required(MESSAGES.required)
});

const initialValues = {
  phone: "",
  password: ""
};

const mapStateToProps = (store: TStore) => {
  return {
    initialValues,
    validationSchema,
    userInfo: store.user.info
  };
};

const mapDispatchToProps = (dispatch: TDispatch) => {
  return {
    getUser: () => dispatch(AGetUser()) as unknown as Promise<TResponseAction>,
    login: (data: TLoginUserData) => dispatch(ALoginUser(data)),
    logout: () => dispatch(ALogoutUser())
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export function withAuthorization<T>(Component: React.ComponentType<T & TAuthorizationContainerProps>) {

  function AuthorizationContainer(p: TAuthorizationContainerProps) {
    const [isChecked, setChecked] = useState(false);
    const [isChecking, setChecking] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const isMountedRef = useRef(true);

    useEffect(() => {
      return () => {
        isMountedRef.current = false;
      };
    }, []);

    useEffect(() => {
      if (!isChecked && !isChecking) {
        setChecking(true);
        p.getUser().then(() => {
          if (isMountedRef.current) setChecking(false);
        });
      }
    }, []);

    useEffect(() => {
      if (!isChecked && p.userInfo) {
        setChecked(true);
        setIsLogin(true);
      }
    });

    useEffect(() => {
      if (isChecked && isChecking) {
        setChecking(false);
      }
    });

    const componentProps = {
      ...p,
      isChecked,
      isLogin,
      isChecking
    } as T & TAuthorizationContainerProps;

    return <Component {...componentProps}/>;
  }

  return connector(AuthorizationContainer) as unknown as React.ComponentType<T>;
}

export type TAuthorizationContainerProps = ConnectedProps<typeof connector> & {
  isLogin: boolean,
  isChecked: boolean,
  isChecking: boolean
}
