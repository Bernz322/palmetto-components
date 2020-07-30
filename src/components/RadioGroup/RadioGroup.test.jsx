import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import RadioGroup from './RadioGroup';

const mockOptions = [{
  id: 'purple',
  value: 'purple',
  label: 'Purple',
},
{
  id: 'green',
  value: 'green',
  label: 'Green',
},
{
  id: 'blue',
  value: 'blue',
  label: 'Blue',
}];

describe('RadioGroup', () => {
  describe('Props Validation', () => {
    describe('Required name', () => {
      test('Throws error if required prop "name" is not supplied to component', () => {
        console.error = jest.fn(); // eslint-disable-line no-console
        render(
          <RadioGroup
            onChange={jest.fn()}
            options={mockOptions}
          />,
        );

        expect(console.error).toHaveBeenCalledTimes(2); // eslint-disable-line no-console
        expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
          .toContain('Failed prop type: The prop `name`');
      });
    });

    describe('Required onChange', () => {
      test('Throws error if required prop "onChange" is not supplied to component', () => {
        console.error = jest.fn(); // eslint-disable-line no-console
        render(
          <RadioGroup
            name="testName"
            options={mockOptions}
          />,
        );

        expect(console.error).toHaveBeenCalledTimes(3); // eslint-disable-line no-console
        expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
          .toContain('The prop `onChange` is marked as required in `RadioGroup`');
        expect(console.error.mock.calls[1][0]) // eslint-disable-line no-console
          .toContain('The prop `onChange` is marked as required in `RadioInput`');
        expect(console.error.mock.calls[2][0]) // eslint-disable-line no-console
          .toContain('You provided a `checked` prop to a form field without an `onChange` handler');
      });
    });

    describe('Required options', () => {
      test('Throws error if required prop "options" is not supplied to component', () => {
        console.error = jest.fn(); // eslint-disable-line no-console
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
          />,
        );

        expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
        expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
          .toContain('Failed prop type: The prop `options`');
      });
    });
  });

  describe('Callback Handling', () => {
    describe('onChange', () => {
      test('onChange event fires callback function', () => {
        const mockHandleChange = jest.fn();

        render(
          <RadioGroup
            name="testName"
            onChange={mockHandleChange}
            options={mockOptions}
          />,
        );

        const radioInput = screen.getByLabelText('Blue');
        fireEvent.click(radioInput);
        expect(mockHandleChange).toHaveBeenCalledTimes(1);
      });

      test('calls onChange and passes checked value in event', () => {
        let value = null;
        const mockedHandleChangeWithValue = jest.fn(event => { value = event.target.value; });

        render(
          <RadioGroup
            name="testName"
            onChange={mockedHandleChangeWithValue}
            options={mockOptions}
          />,
        );
        const radioInput = screen.getByLabelText('Blue');
        fireEvent.click(radioInput);
        expect(mockedHandleChangeWithValue).toBeCalledTimes(1);
        expect(value).toBe('blue');
      });
    });

    describe('onFocus', () => {
      test('onFocus event fires callback function', () => {
        const mockedHandleFocus = jest.fn();

        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={mockOptions}
            onFocus={mockedHandleFocus}
          />,
        );
        const radioInput = screen.getByLabelText('Blue');
        fireEvent.focus(radioInput);
        expect(mockedHandleFocus).toBeCalledTimes(1);
      });
    });

    describe('onBlur', () => {
      test('onBlur event fires callback function', () => {
        const mockedHandleBlur = jest.fn();

        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={mockOptions}
            onBlur={mockedHandleBlur}
          />,
        );
        const radioInput = screen.getByLabelText('Blue');
        fireEvent.blur(radioInput);
        expect(mockedHandleBlur).toBeCalledTimes(1);
      });
    });
  });

  describe('States', () => {
    describe('Default', () => {
      test('it renders 3 radio inputs', () => {
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={mockOptions}
          />,
        );

        const radioInputElements = screen.getAllByRole('radio');
        expect(radioInputElements).toHaveLength(3);
      });

      test('it renders 3 labels', () => {
        render(
          <RadioGroup
            name="mockName"
            onChange={jest.fn()}
            options={mockOptions}
          />,
        );

        const purpleRadioInputLabel = screen.getByLabelText('Purple');
        const greenRadioInputLabel = screen.getByLabelText('Green');
        const blueRadioInputLabel = screen.getByLabelText('Blue');

        expect(purpleRadioInputLabel).toBeInTheDocument();
        expect(greenRadioInputLabel).toBeInTheDocument();
        expect(blueRadioInputLabel).toBeInTheDocument();
      });
    });

    describe('With Title', () => {
      test('it renders the title', () => {
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={mockOptions}
            title="Mock Title"
          />,
        );

        const title = screen.getByText('Mock Title');
        expect(title).toBeInTheDocument();
      });
    });

    describe('With Title and Description', () => {
      const mockGroup = (
        <RadioGroup
          name="testName"
          onChange={jest.fn()}
          options={mockOptions}
          title="Mock Title"
          description="Mock Description"
        />
      );
      test('it renders the title', () => {
        render(mockGroup);

        const title = screen.getByText('Mock Title');
        expect(title).toBeInTheDocument();
      });

      test('it renders the description', () => {
        render(mockGroup);

        const description = screen.getByText('Mock Description');
        expect(description).toBeInTheDocument();
      });
    });

    describe('Required', () => {
      test('it renders asterisk next to the title', () => {
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={mockOptions}
            title="Mock Title"
            isRequired
          />,
        );

        const title = screen.getByText('*');
        expect(title).toBeInTheDocument();
      });
    });

    describe('Pre-Selected Option', () => {
      test('an option is automatically selected', () => {
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={mockOptions}
            title="Mock Title"
            value="green"
          />,
        );

        const greenRadioInput = screen.getByLabelText('Green').closest('div').firstChild;
        expect(greenRadioInput).toBeChecked();
      });
    });
  });
});
