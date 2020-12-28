import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";

it("app load correct", () => {
  const AppInstance = renderer.create(<App/>).toJSON();
  expect(AppInstance).toMatchSnapshot();
});
