import { Func1 } from 'redux';
import type { MutableState, Mutator } from 'final-form';

export function mapErrorsToFieldErrorMessages(errors: any) {
  const errorMessages: any = {};
  for (const errorField in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, errorField)) {
      errorMessages[errorField] = errors[errorField].join('. ');
    }
  }

  return errorMessages;
}

const chain = (inputObj: object, subKey: string, prop: string) =>
  Array.isArray(inputObj) ? `${subKey}[${prop}]` : `${subKey}.${prop}`;
export function obj2FormData(obj: object) {
  const getKeyPathValues = function* (
    inputObj: any,
    subKeyStr = '',
  ): Generator<{ key: string; value: string | Blob; fileName?: string }> {
    for (const i in inputObj) {
      const value = inputObj[i];
      const subKeyStrTrans = subKeyStr ? chain(inputObj, subKeyStr, i) : i;

      if (value instanceof File) {
        yield { key: subKeyStrTrans, value, fileName: value.name };
      } else if (typeof value === 'string' || value instanceof Blob) {
        yield { key: subKeyStrTrans, value };
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        yield { key: subKeyStrTrans, value: value.toString() };
      } else if (typeof value === 'object') {
        for (const res of getKeyPathValues(value, subKeyStrTrans)) {
          yield res;
        }
      }
    }
  };
  const formData = new FormData();

  for (const kv of getKeyPathValues(obj)) {
    kv.fileName ? formData.append(kv.key, kv.value, kv.fileName) : formData.append(kv.key, kv.value);
  }

  return formData;
}

export const composeValidators =
  (...validators: Array<Func1<any, any>>) =>
  (value: any) =>
    validators.reduce((error, validator) => error || validator(value), undefined);

export const setFieldTouched: Mutator = (args: any[], state: MutableState<any, any>) => {
  const [name, touched] = args;
  const field = state.fields[name];
  if (field) {
    field.touched = !!touched;
  }
};

export function validateEmail(formValue: string) {
  return formValue && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValue)
    ? 'Invalid email address'
    : undefined;
}

export function validateLink(formValue: string) {
  return formValue &&
    !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i.test(
      formValue,
    )
    ? 'Invalid URL'
    : undefined;
}

export function required(value: any) {
  return value ? undefined : 'Required';
}

export function requiredFile(value: { name: string }) {
  return value?.name ? undefined : 'Required';
}

export function number(value: any) {
  return value && isNaN(Number(value)) ? 'Must be a valid number' : undefined;
}

export const numberRange = (from: number, to: number) => (value: any) => {
  const numberError = number(value);
  if (numberError) {
    return numberError;
  }
  if (value < from) {
    return `Must be bigger than ${from}`;
  }
  if (value > to) {
    return `Must be smaller than ${to}`;
  }
  return undefined;
};

export function requiredValidator(errorMessage: string) {
  return (value: any) => (value ? undefined : errorMessage);
}

export function numberValidator(errorMessage: string) {
  return (value: any) => (value && isNaN(Number(value)) ? errorMessage : undefined);
}

export function emailValidator(errorMessage: string) {
  return (value: any) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? errorMessage : undefined;
  };
}

export const requiredCheckboxRadioGroupValidator = (errorMessage: string) => (value: string[]) => {
  return value && value.length ? undefined : errorMessage;
};
