'use client'

import {
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
  type DateRange,
} from 'react-aria-components'
import { type Dispatch, type SetStateAction } from 'react'
import { today, getLocalTimeZone } from '@internationalized/date'

import { classnames } from '@/utils'
import BiChevronLeft from '@/icons/BiChevronLeft'
import BiChevronDown from '@/icons/BiChevronDown'
import BiChevronRight from '@/icons/BiChevronRight'

const fallbackRange = {
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()),
}
interface DateRangePickerProps {
  range: DateRange | null
  setRange: Dispatch<SetStateAction<DateRange | null>>
}

const DateRangePicker = ({
  setRange,
  range = fallbackRange,
}: DateRangePickerProps) => {
  return (
    <ArialDateRangePicker onChange={setRange} value={range}>
      <Group className="flex w-fit gap-2 rounded-md border border-neutral-300 p-2 px-3 text-neutral-900 focus:border-primary focus:ring-1 focus:ring-orange-300 focus-visible:outline-0">
        <DateInput className="flex gap-1" slot="start">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <span aria-hidden="true">-</span>
        <DateInput className="flex gap-1" slot="end">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button className="text-xl">
          <BiChevronDown />
        </Button>
      </Group>
      <Popover
        className={({ defaultClassName }) =>
          classnames(
            defaultClassName,
            'rounded-lg border border-primary-light bg-white/90 p-4 shadow-lg backdrop-blur'
          )
        }
      >
        <Dialog>
          <RangeCalendar>
            <header className="mb-3 flex items-center justify-between gap-2">
              <Button slot="previous" className="text-xl">
                <BiChevronLeft />
              </Button>
              <Heading />
              <Button slot="next" className="text-xl">
                <BiChevronRight />
              </Button>
            </header>
            <CalendarGrid className="w-full">
              {(date) => (
                <CalendarCell
                  className={({
                    isSelected,
                    isSelectionEnd,
                    isSelectionStart,
                    isOutsideMonth,
                  }) =>
                    classnames(
                      isOutsideMonth && 'hidden',
                      isSelected ? 'text-datk bg-primary-light' : '',
                      isSelectionEnd && 'rounded-e !bg-primary text-white',
                      isSelectionStart && 'rounded-s !bg-primary text-white',
                      'p-1 text-center'
                    )
                  }
                  date={date}
                />
              )}
            </CalendarGrid>
          </RangeCalendar>
        </Dialog>
      </Popover>
    </ArialDateRangePicker>
  )
}

export default DateRangePicker
