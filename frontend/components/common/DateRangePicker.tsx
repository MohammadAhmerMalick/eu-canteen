'use client'

import {
  Label,
  Group,
  Dialog,
  Button,
  Heading,
  Popover,
  DateInput,
  DateSegment,
  CalendarCell,
  CalendarGrid,
  RangeCalendar,
  DateRangePicker as ArialDateRangePicker,
} from 'react-aria-components'
import { classnames } from '@/utils'

const DateRangePicker = () => {
  return (
    <ArialDateRangePicker>
      <Label>Trip dates</Label>
      <Group className="flex gap-2">
        <DateInput className="flex gap-1" slot="start">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <span aria-hidden="true">-</span>
        <DateInput className="flex gap-1" slot="end">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button>▼</Button>
      </Group>
      <Popover>
        <Dialog>
          <RangeCalendar>
            <header className="flex items-center gap-2">
              <Button slot="previous">◀</Button>
              <Heading />
              <Button slot="next">▶</Button>
            </header>
            <div className="w-full rounded-lg border-primary bg-white/50 p-2 text-center shadow-lg backdrop-blur">
              <CalendarGrid>
                {(date) => (
                  <CalendarCell
                    className={({ isSelected }) =>
                      classnames(isSelected ? 'bg-primary-light' : '', 'p-2')
                    }
                    date={date}
                  />
                )}
              </CalendarGrid>
            </div>
          </RangeCalendar>
        </Dialog>
      </Popover>
    </ArialDateRangePicker>
  )
}

export default DateRangePicker
