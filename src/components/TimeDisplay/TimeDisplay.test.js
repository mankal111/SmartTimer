import { render, screen } from '@testing-library/react';
import TimeInput from '.';

test('renders remaining time', () => {
    const timeText="15:30";
    render(<TimeInput timeText={timeText} />);
    const timeDisplayContainer = screen.getByLabelText(/remaining time/i);
    expect(timeDisplayContainer).toHaveTextContent(timeText);
});
