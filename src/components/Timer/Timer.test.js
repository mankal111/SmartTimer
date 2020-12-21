import { render, screen, fireEvent } from '@testing-library/react';
import Timer from '.';

test('renders contents', () => {
    render(<Timer />);
    const timeDisplay = screen.getByLabelText(/remaining time/i);
    const timeInput = screen.getByLabelText(/set custom time/i);
    expect(timeDisplay).toBeInTheDocument();
    expect(timeInput).toBeInTheDocument();
});
