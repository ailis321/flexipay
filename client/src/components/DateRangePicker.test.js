import React from 'react';
import { render } from '@testing-library/react';
import DateRangePicker from './DateRangePicker';

describe('DateRangePicker', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <DateRangePicker
        startDate={new Date()}
        endDate={new Date()}
        setStartDate={() => {}}
        setEndDate={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
