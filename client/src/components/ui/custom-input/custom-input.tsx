import React from "react";
import "./custom-input.scss";
import {Input} from "antd";
import {InputProps} from "antd/lib/input";
import {FieldHookConfig, useField} from "formik";

export function CustomInput(p: TCustomInputProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta] = useField(p);
  const inputProps: any = {...p, ...field};

  ["className", "label", "disabled", "valid"].forEach(key => {
    if (inputProps.hasOwnProperty(key)) delete inputProps[key];
  });

  return <div className={`${p.className || ""} custom-input`}>
    {p.label ? <div className="custom-input__label input-label">{p.label}</div> : null}
    <Input {...inputProps}/>
    {meta.error && meta.touched && <div>{meta.error}</div>}
  </div>;
}

type TCustomInputProps = InputProps & FieldHookConfig<any> &{
  label?: string,
  disabled?: boolean,
  valid?: boolean
}
