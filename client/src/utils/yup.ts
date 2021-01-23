import * as Yup from "yup";
// import {ref, StringSchema} from "yup";
//
// type TYupRef = typeof ref;
//
// function equalTo(this: StringSchema, ref: TYupRef, message?: string) {
//   return this.test({
//     name: "equalTo",
//     exclusive: false,
//     message: message || "${path} must be the same as ${reference}",
//     params: {
//       reference: ref.path
//     },
//     test: function(value) {
//       return value === this.resolve(ref);
//     }
//   });
// }
//
// Yup.addMethod(Yup.string, "equalTo", equalTo);


function equalTo(this: any, ref: any, message: string) {
  return this.test({
    name: "equalTo",
    exclusive: false,
    message: message || "${path} must be the same as ${reference}",
    params: {
      reference: ref.path
    },
    test: function(value: any) {
      return value === this.resolve(ref);
    }
  });
}

Yup.addMethod(Yup.string, "equalTo", equalTo);

export {Yup};
