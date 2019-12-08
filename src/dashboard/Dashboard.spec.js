// Test away
import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./Dashboard";
import Controls from "../controls/Controls";

test("renders controls and display", () => {
    const wrapper = rtl.render(<Dashboard />);
    const element = wrapper.getByText(/unlocked/i);

    expect(element).toBeVisible();

})

test("renders controls", () => {
    const wrapper = rtl.render(<Controls />);
    const element = wrapper.getByText(/close/i);

    expect(element).toBeVisible();

})