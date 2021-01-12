import {connect, ConnectedProps} from "react-redux";
import {TStore} from "../../store";
import {TDispatch} from "../../types/common";
import {AGetUser, ALoginUser, ALogoutUser, TGetUserData, TLoginUserData} from "../../actions/user";
import * as Yup from "yup";
import React from "react";

const validationSchema = Yup.object({
  phone: Yup.string()
    .max(15, "Телефон не может содержать менее 15 символов")
    .required("Обязательное поле"),
  password: Yup.string()
    .required("Обязательное поле")
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
    getUser: (data: TGetUserData) => dispatch(AGetUser(data)),
    login: (data: TLoginUserData) => dispatch(ALoginUser(data)),
    logout: () => dispatch(ALogoutUser())
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export function withLogin<T>(Component: React.ComponentType<T & TLoginContainerProps>) {

  function LoginContainer(props: TLoginContainerProps) {
    const componentProps = {
      ...props
    } as T & TLoginContainerProps;

    return <Component {...componentProps}/>;
  }

  return connector(LoginContainer) as unknown as React.ComponentType<T>;
}

export type TLoginContainerProps = ConnectedProps<typeof connector> & {
  info: number
};
