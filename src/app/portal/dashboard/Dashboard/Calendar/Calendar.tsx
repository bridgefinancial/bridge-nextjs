'use client';
import { User } from '@/types/users.types';
import { Check } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';
import { InlineWidget } from 'react-calendly';
import { useLocalStorage } from 'usehooks-ts';

type CalendarProps = {
  user?: User;
};

// Represents the timestamp when a calendly event was booked
const SCHEDULED_EVENT_TIME_LOCAL_STORAGE_KEY = 'calendly_scheduled_event_time';
const DAYS_AFTER_SCHEDULING_TO_HIDE_CALENDAR = 14;

export const CALENDLY_LINK =
  'https://calendly.com/jimmy-choi-bridge/consultation-to-buy-a-business';

const Calendar = ({ user }: CalendarProps) => {
  const [height, setHeight] = useState('900px');
  const [scheduledEventTime, setScheduledEventTime] = useLocalStorage<
    Date | undefined
  >(SCHEDULED_EVENT_TIME_LOCAL_STORAGE_KEY, undefined, {
    serializer: (value) => {
      return value?.toISOString() ?? '';
    },
    deserializer: (value) => {
      if (value) {
        return new Date(value);
      }
      return undefined;
    },
  });

  // Represents the initial localstorage value of when the last calendly event was scheduled
  // when component mounts
  const scheduledEventTimeRead = useMemo(() => {
    return scheduledEventTime;
  }, []);

  const shouldHideCalendar = !!(
    scheduledEventTimeRead &&
    new Date().valueOf() - scheduledEventTimeRead.valueOf() <
      1000 * 60 * 60 * 24 * DAYS_AFTER_SCHEDULING_TO_HIDE_CALENDAR
  );

  // EFFECTS

  useEffect(() => {
    function isCalendlyEvent(e: any) {
      return (
        e.origin === 'https://calendly.com' &&
        e.data.event &&
        e.data.event.indexOf('calendly.') === 0
      );
    }

    const handleCalendlyIframeMessage = (e: MessageEvent) => {
      if (isCalendlyEvent(e)) {
        if (e.data.event === 'calendly.page_height' && e.data.payload.height) {
          setHeight(e.data.payload.height);
        }

        if (e.data.event === 'calendly.event_scheduled') {
          // payload is { invitee: { uri: string }, event: { uri: string }}
          setScheduledEventTime(new Date());
        }

        if (e.data.event === 'calendly.date_and_time_selected') {
          // payload is empty
        }
      }
    };

    window.addEventListener('message', handleCalendlyIframeMessage);

    return () =>
      window.removeEventListener('message', handleCalendlyIframeMessage);
  }, []);

  return (
    <div className="rounded-[20px] border border-solid border-bridge-gray-border bg-white p-6">
      {shouldHideCalendar ? (
        <div className="text-center flex flex-col gap-4">
          <div className="flex items-center justify-center gap-2">
            <div className="border border-bridge-dark-blue rounded-full shrink-0 w-6 h-6 flex items-center justify-center">
              <Check color="info" fontSize="small"></Check>
            </div>
            <p className="text-[20px] font-semibold">You are scheduled</p>
          </div>
          <p className="text-[14px] text-gray-400">
            A calendar invitation has been sent to your email address.
          </p>
        </div>
      ) : (
        <InlineWidget
          url={CALENDLY_LINK}
          prefill={{
            name:
              user && (user.first_name || user.last_name)
                ? `${user?.first_name} ${user?.last_name}`
                : undefined,
            firstName: user?.first_name,
            lastName: user?.last_name,
            email: user?.email,
            smsReminderNumber: user?.phone,
          }}
          styles={{
            width: '100%',
            height: height,
          }}
        />
      )}
    </div>
  );
};

export default Calendar;
