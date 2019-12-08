// Test away!

import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Display from "./Display";
import Dashboard from "../dashboard/Dashboard";

test("gate defaults to unlocked and open", () => {
    const wrapper = rtl.render(<Display />);
    const unlocked = wrapper.getByText(/unlocked/i);
    const open = wrapper.getByText(/open/i);

    expect(unlocked).toBeVisible();
    expect(open).toBeVisible();
})

test("displays 'Closed' if the closed prop is true and 'Open' if otherwise", () => {
    const wrapper = rtl.render(<Display closed={true}/>);
    const closed = wrapper.getByText(/closed/i);

    expect(closed).toBeVisible();
})

test("displays 'locked' if the locked prop is true and 'unlocked' if otherwise", () => {
    const wrapper = rtl.render(<Display locked={true}/>);
    const locked = wrapper.getByText(/locked/i);

    expect(locked).toBeVisible();
})

test("when locked or closed use the red led class", () => {
    const wrapper = rtl.render(<Display closed={true} locked={true}/>);
    const locked = wrapper.getByText(/locked/i);
    const closed = wrapper.getByText(/closed/i);

    expect(locked).toHaveProperty("className", "led red-led");
    expect(closed).toHaveProperty("className", "led red-led");
})

test("when locked or closed use the red led class", () => {
    const wrapper = rtl.render(<Display closed={false} locked={false}/>);
    const unlocked = wrapper.getByText(/unlocked/i);
    const open = wrapper.getByText(/open/i);

    expect(unlocked).toHaveProperty("className", "led green-led");
    expect(open).toHaveProperty("className", "led green-led");
})

test('cannont be closed or opened if it is locked', () => {
    const wrapper = rtl.render(<Dashboard />);
    const closeButton = wrapper.getByTestId("open-close");
    const lockButton = wrapper.getByTestId("lock-unlock");

    rtl.act(() => {
        rtl.fireEvent.click(closeButton);
        rtl.fireEvent.click(lockButton);
    });

    expect(closeButton).toHaveProperty("disabled", false);
});