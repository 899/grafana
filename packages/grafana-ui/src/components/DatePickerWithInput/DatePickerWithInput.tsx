import React from 'react';
import { css } from '@emotion/css';
import { dateTimeFormat } from '@grafana/data';
import { DatePicker } from '../DatePicker/DatePicker';
import { Props as InputProps, Input } from '../Input/Input';
import { useStyles } from '../../themes';

export const formatDate = (date: Date) => dateTimeFormat(date, { format: 'YYYY-MM-DD' });

/** @public */
export interface DatePickerWithInputProps extends Omit<InputProps, 'ref' | 'value' | 'onChange'> {
  value?: Date;
  onChange: (value: Date) => void;
  /** Hide the calendar when date is selected */
  closeOnSelect?: boolean;
}

/** @public */
export const DatePickerWithInput = ({ value, onChange, closeOnSelect, ...rest }: DatePickerWithInputProps) => {
  const [open, setOpen] = React.useState(false);
  const styles = useStyles(getStyles);

  return (
    <div className={styles.container}>
      <Input
        type="date"
        placeholder={'Date'}
        value={value ? formatDate(value) : undefined}
        onClick={() => setOpen(true)}
        onChange={() => {}}
        className={styles.input}
        {...rest}
      />
      <DatePicker
        isOpen={open}
        value={value}
        onChange={(ev) => {
          onChange(ev);
          if (closeOnSelect) {
            setOpen(false);
          }
        }}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

const getStyles = () => {
  return {
    container: css`
      position: relative;
    `,
    input: css`
    /* hides the native Calendar picker icon given when using type=date */
    input[type='date']::-webkit-inner-spin-button,
    input[type='date']::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
    `,
  };
};
