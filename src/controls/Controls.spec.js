// Test away!
import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "../dashboard/Dashboard";
import Controls from "./Controls";

test("provide buttons to toggle the closed and locked states", () => {
    const wrapper = rtl.render(<Dashboard />);
    const button1 = wrapper.getByTestId("lock-unlock");
    const button2 = wrapper.getByTestId("open-close");

    expect(button1).toBeVisible();
    expect(button2).toBeVisible();

})

test('buttons text changes to reflect the state the door will be in if clicked', () => {
    const { getByText } = rtl.render(
        <Dashboard>
            <Controls />
        </Dashboard>
    );
    rtl.fireEvent.click(getByText(/close gate/i));
    getByText(/open gate/i);
});

test('the closed toggle button is disabled if the gate is locked', () => {
    const wrapper = rtl.render(<Dashboard />);
    const closeButton = wrapper.getByTestId("open-close");
    const lockButton = wrapper.getByTestId("lock-unlock");

    rtl.act(() => {
        rtl.fireEvent.click(closeButton);
        rtl.fireEvent.click(lockButton);
    });

    expect(closeButton).toHaveProperty("disabled", false);
});

test('the locked toggle button is disabled if the gate is open', () => {
    const wrapper = rtl.render(<Dashboard />);
    
    const openDisplay = wrapper.getByTestId("open-display");
    const lockButton = wrapper.getByTestId("lock-unlock");

    expect(lockButton).toHaveProperty("disabled", true);

})