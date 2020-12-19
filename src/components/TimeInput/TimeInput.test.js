import { render, screen, fireEvent } from '@testing-library/react';
import TimeInput from '.';

const setup = () => {
    const setTime = jest.fn();
    render(<TimeInput initialSeconds={125} setTime={setTime} />);
    const minutesField = screen.getByLabelText(/minutes/i);
    const secondsField = screen.getByLabelText(/seconds/i);
    const setButton = screen.getByText(/set/i);
    return { minutesField, secondsField, setButton, setTime };
}

test('renders minutes and seconds inputs and a button', () => {
    const { minutesField, secondsField, setButton } = setup();
    expect(minutesField).toBeInTheDocument();
    expect(secondsField).toBeInTheDocument();
    expect(setButton).toBeInTheDocument();
});

test('renders the initial time correctly', () => {
    const { minutesField, secondsField } = setup();
    expect(minutesField).toHaveValue(2);
    expect(secondsField).toHaveValue(5);
});

test('calls setTime callback with the correct amount of seconds', () => {
    const { minutesField, secondsField, setButton, setTime } = setup();
    fireEvent.change(minutesField, { target: { value: '2'}});
    fireEvent.change(secondsField, { target: { value: '3'}});
    fireEvent.click(setButton);
    expect(setTime).toHaveBeenCalledWith(2 * 60 + 3);
});

test('adds fieldError class in the fields with out of bound values', () => {
    const { minutesField, secondsField } = setup();
    expect(minutesField).not.toHaveClass('fieldError');
    fireEvent.change(minutesField, { target: { value: '-1'}});
    expect(minutesField).toHaveClass('fieldError');

    expect(secondsField).not.toHaveClass('fieldError');
    fireEvent.change(secondsField, { target: { value: '-1'}});
    expect(secondsField).toHaveClass('fieldError');
    fireEvent.change(secondsField, { target: { value: '1'}});
    expect(secondsField).not.toHaveClass('fieldError');
    fireEvent.change(secondsField, { target: { value: '61'}});
    expect(secondsField).toHaveClass('fieldError');
});

test('alerts the user who tries to set invalid values', () => {
    const { minutesField, secondsField, setButton, setTime } = setup();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.change(minutesField, { target: { value: '-1'}});
    fireEvent.click(setButton);
    expect(window.alert).toHaveBeenCalledTimes(1);
    fireEvent.change(minutesField, { target: { value: '1'}});
    fireEvent.change(secondsField, { target: { value: '-1'}});
    fireEvent.click(setButton);
    expect(window.alert).toHaveBeenCalledTimes(2);
    fireEvent.change(secondsField, { target: { value: '60'}});
    fireEvent.click(setButton);
    expect(window.alert).toHaveBeenCalledTimes(3);
    expect(setTime).toHaveBeenCalledTimes(0);
});