import {connect, ConnectedProps} from "react-redux";
import {TStore} from "../../store";
import {TDispatch} from "../../types/common";
import {AGetUser, ALoginUser, ALogoutUser, TGetUserData, TLoginUserData} from "../../actions/user";
import {Login} from "./login";
import * as Yup from "yup";

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

export const LoginContainer = connector(Login);
export type TLoginContainer = ConnectedProps<typeof connector>

