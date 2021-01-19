import React from "react";
import {InputProps} from "antd/lib/input";
import {FieldHookConfig, useField} from "formik";
import NumberFormat, {NumberFormatProps, NumberFormatValues} from "react-number-format";
import "./custom-input.scss";
import {Input} from "antd";
import {toEvent} from "../../../utils/common";


export const CustomInput = React.memo((p: TCustomInputProps) => {
  const [field, meta] = useField(p);
  const inputProps: any = {...p, ...field};
  const inValid = meta.error && meta.touched;

  switch (p.formatType) {
  case "gapNumber": {
    inputProps.thousandSeparator = true;
    break;
  }
  case "phone": {
    inputProps.format = "+# (###) ###-####";
    inputProps.mask = "_";
    break;
  }
  }

  ["className", "label", "disabled", "valid", "isMasked", "formatType"].forEach(key => {
    if (inputProps.hasOwnProperty(key)) delete inputProps[key];
  });

  if (p.isMasked) {
    delete inputProps.onChange;
    inputProps.onValueChange = onValueChange;
    inputProps.className = "ant-input";
  }

  return <div className={`${p.className || ""} custom-input ${inValid && "custom-input--error"}`}>
    {p.label ? <div className="custom-input__label input-label">{p.label}</div> : null}
    {p.isMasked ? <NumberFormat {...inputProps}/> : <Input {...inputProps}/>}
    {inValid && <div className="custom-input__error input-error">{meta.error}</div>}
  </div>;

  function onValueChange(values: NumberFormatValues) {
    field.onChange(toEvent(values.value, field.name));
  }

});


type TCustomInputProps = InputProps & FieldHookConfig<any> & NumberFormatProps & {
  label?: string,
  disabled?: boolean,
  isMasked?: boolean,
  formatType?: "gapNumber" | "phone"
}
