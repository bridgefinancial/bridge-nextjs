'use client';
import { InlineWidget } from 'react-calendly';

type CalendarProps = {};

export const CALENDLY_LINK =
  'https://calendly.com/jimmy-choi-bridge/consultation-to-buy-a-business';

const Calendar = ({}: CalendarProps) => {
  return (
    <div className="rounded-[20px] border border-solid border-bridge-gray-border bg-white p-6">
      <InlineWidget
        url={CALENDLY_LINK}
        styles={{
          width: '100%',
          height: '900px',
        }}
      />
    </div>
  );
};

export default Calendar;
