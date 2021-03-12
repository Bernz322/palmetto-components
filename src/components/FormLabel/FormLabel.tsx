import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Box } from '../Box/Box';
import styles from './FormLabel.module.scss';

export interface FormLabelProps {
  /**
   * Content to be rendered inside the label.
   */
  children: ReactNode;
  /**
   * The id of the form control that the label is labeling
   */
  inputId: string;
  /**
   * Custom class to pass to label element.
   */
  className?: string;
  /**
   * Display label inline with surrounding elements
   */
  displayInline?: boolean;
  /**
   * Mark the label has invalid
   */
  hasError?: boolean;
  /**
   * Additional clarifying text to that helps describe the field
   */
  helpText?: ReactNode;
  /**
   * Mark the label has disabled
   */
  isDisabled?: boolean;
  /**
   * Render an asterisk after the label to mark it as required
   */
  isFieldRequired?: boolean;
  /**
   * Apply custom styling to labels for a radio input
   */
  isRadioInputLabel?: boolean;
}

export const FormLabel: FC<FormLabelProps> = ({
  children,
  inputId,
  className = '',
  displayInline = false,
  hasError = false,
  helpText,
  isDisabled = false,
  isFieldRequired = false,
  isRadioInputLabel = false,
}) => {
  const labelClasses = classNames(styles.label, className, {
    [styles.disabled]: isDisabled,
    [styles.error]: hasError,
    [styles.disabled]: isDisabled,
    [styles.inline]: displayInline,
    [styles['radio-input-label']]: isRadioInputLabel,
  });

  return (
    <label id={`${inputId}Label`} className={labelClasses} htmlFor={inputId}>
      {children}
      {isFieldRequired && <>&nbsp;*</>}
      {helpText && (
        <Box as="p" display="block" fontSize="sm" color="grey" className={styles['help-text']}>
          {helpText}
        </Box>
      )}
    </label>
  );
};
