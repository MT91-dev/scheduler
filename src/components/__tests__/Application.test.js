import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, act } from "@testing-library/react";
import axios from "axios";
import Application from "components/Application";
import { debug } from "request";

afterEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

describe("Application", () => {

  it("renders without crashing", () => {
    render(<Application />);
  });

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    act(() => {
      fireEvent.click(getByText("Tuesday"));
    })

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    act(() => {
      fireEvent.click(getByAltText(appointment, "Add"));
    });

    act(() => {
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });
    });

    act(() => {
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    });

    act(() => {
      fireEvent.click(getByText(appointment, "Save"));
    });

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    act(() => {
      fireEvent.click(queryByAltText(appointment, "Delete"));
    });

    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    act(() => {
      fireEvent.click(queryByText(appointment, "Confirm"));
    });

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    act(() => {
      fireEvent.click(queryByAltText(appointment, "Edit"));
    });

    act(() => {
      fireEvent.click(queryByText(appointment, "Save"));
    });

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Archie Cohen"));
  })

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    act(() => {
      fireEvent.click(queryByAltText(appointment, "Edit"));
    });

    act(() => {
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    });

    act(() => {
      fireEvent.click(getByText(appointment, "Save"));
    });

    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();

    // debug(appointment);

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    act(() => {
      fireEvent.click(queryByAltText(appointment, "Delete"))
    });

    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    act(() => {
      fireEvent.click(queryByText(appointment, "Confirm"))
    });

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();

  });

});