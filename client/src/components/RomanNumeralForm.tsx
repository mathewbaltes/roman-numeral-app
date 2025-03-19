import React, { useState } from 'react'
import {
    Flex,
    Form,
    View,
    Button,
    TextField,
} from '@adobe/react-spectrum';
import getRomanNumeral from 'api/romanNumeral';
import Sentry from 'logging/sentry';
import { RomanNumeralResponse } from 'api/types';

// Collection of error messages that we could I18N translate
const MESSAGES = {
    'roman-numeral-title': 'Roman numeral converter',
    'roman-numeral-input-label': 'Enter a number',
    'roman-numeral-button': 'Convert to roman numeral',
    'roman-numeral-button-aria': 'Convert inputted number to roman numeral',
    'invalid': 'Please enter a valid number between 1 and 3999',
    'server': 'An error occurred while converting the number to a roman numeral. Please try again later.'
}

export const RomanNumeralForm = () => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [romanNumeralValue, setRomanNumeralValue] = useState<string>('');
    const [romanNumeralResult, setRomanNumeralResult] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onInputChanged = (value: string) => {
        setError('');
        setRomanNumeralValue(value);
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent default browser refresh
        e.preventDefault();

        // Set submitting to true so we prevent any future submissions
        setSubmitting(true);

        // Clear all existing errors
        setError('');

        // Clear existing roman numeral result
        setRomanNumeralResult('');

        // Get form data as an object.
        const data = Object.fromEntries(
            new FormData(e.currentTarget)
        );

        const number: number = Number.parseInt(data['number'] as string);

        if (Number.isNaN(number) || number < 1 || number > 3999) {
            setError(MESSAGES['invalid']);
            setSubmitting(false);
        } else {
            // If frontend validation looks good, lets try to submit the form.
            // Otherwise, we can handle the error.
            try {
                // Get the roman numeral request and set the data for the UI.
                try {
                    const response = await getRomanNumeral(number);
                    const data = await response.json();

                    const rnResponse = data as RomanNumeralResponse;

                    if (rnResponse.errors) {
                        setError(rnResponse.errors[0].msg);
                    } else {
                        if (rnResponse.output) {
                            setRomanNumeralResult(rnResponse.output)
                        } else {
                            setError(MESSAGES['server'])
                        }
                    }
                } catch (error) {
                    Sentry.logError(error as Error);
                    setError(MESSAGES['server'])
                } finally {
                    setSubmitting(false);
                }
            } catch (e) {
                Sentry.logError(e as Error);
                setError(MESSAGES['server'])
                setSubmitting(false);
            }
        }
    };

    const isInvalid = romanNumeralValue.length < 1;

    return (
        <Form onSubmit={onSubmit} validationBehavior="native">
            <Flex direction="column" gap="size-200">
                <View>
                    <h1>
                        {MESSAGES['roman-numeral-title']}
                    </h1>
                </View>
                <View>
                    <TextField
                        label={MESSAGES['roman-numeral-input-label']}
                        name="number"
                        value={romanNumeralValue}
                        onChange={onInputChanged}
                        isRequired
                        validationState={!!error ? 'invalid' : undefined}
                        errorMessage={error}
                    />
                </View>
                <View>
                    <Button
                        variant="primary"
                        type="submit"
                        aria-label={MESSAGES['roman-numeral-button-aria']}
                        isPending={submitting}
                        isDisabled={isInvalid}
                    >
                        {MESSAGES['roman-numeral-button']}
                    </Button>
                </View>
                {romanNumeralResult && <View>Roman numeral: {romanNumeralResult}</View>}
            </Flex>
        </Form>
    );
}