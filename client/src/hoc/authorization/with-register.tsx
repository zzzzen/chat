import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {TDispatch, TResponseAction, TUserInfo} from "../../types/common";
import {ARegisterUser, TRegisterUserData} from "../../actions/user";
import {MESSAGES} from "../../utils/messages";
import {Yup} from "../../utils/yup";
import {FormikHelpers} from "formik";
import {ASetLoaderState} from "../../actions/common";

const validationSchema = Yup.object({
  name: Yup.string()
    .required(MESSAGES.required),
  surname: Yup.string()
    .required(MESSAGES.required),
  patronymic: Yup.string(),
  phone: Yup.string()
    .max(11, MESSAGES.maxLength(11))
    .min(11, MESSAGES.minLength(11))
    .required(MESSAGES.required),
  email: Yup.string()
    .email(MESSAGES.email),
  password: Yup.string()
    .min(6, MESSAGES.minLength(6))
    .required(MESSAGES.required),
  passwordConfirm: Yup.string()
    // @ts-ignore
    .equalTo(Yup.ref("password"))
    .required(MESSAGES.required),
});

const initialValues = {
  name: "",
  surname: "",
  patronymic: "",
  phone: "",
  email: "",
  password: "",
  passwordConfirm: ""
};

const mapStateToProps = () => {
  return {
    initialValues,
    validationSchema,
  };
};

const mapDispatchToProps = (dispatch: TDispatch) => {
  return {
    register: (data: TRegisterUserData) => dispatch(ARegisterUser(data)) as Promise<TResponseAction>,
    setLoaderState: (visible: boolean) => dispatch(ASetLoaderState(visible))
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export function withRegister<T>(Component: React.ComponentType<T & TRegisterContainerProps>) {

  const validateAjax: validateAjax = (resp, actions) => {
    if (resp.error && resp.error.response.status === 409) {
      actions.setErrors({
        phone: MESSAGES.register
      });
    }
  };

  function RegisterContainer(p: TRegisterContainerProps) {
    const componentProps = {
      ...p,
      validateAjax
    } as T & TRegisterContainerProps;

    return <Component {...componentProps}/>;
  }

  return connector(RegisterContainer) as unknown as React.ComponentType<T>;
}

export type TRegisterContainerProps = ConnectedProps<typeof connector> & {
  validateAjax: validateAjax
};

type validateAjax = (resp: TResponseAction, actions: FormikHelpers<typeof initialValues>) => void
