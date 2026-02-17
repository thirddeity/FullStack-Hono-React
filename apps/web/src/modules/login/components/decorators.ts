/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UserInfoForm } from '@repo/schema';
import createDecorator from 'final-form-calculate';


const resultField = 'email';
const targetFields = Array.from({ length: 99 }, (_, i) => `field_${i + 1}`);

export const calculator = createDecorator<UserInfoForm>({
  field: targetFields,
  updates: {

    [resultField]: (val, allVal: any) => {
      console.log("val +>", val);
      console.log("allVal +>", allVal);
      const valuesList = targetFields
        .map(fieldName => {

          const val = allVal[fieldName];
          return val ? `${fieldName}:${val}` : null;
        })
        .filter(v => v !== null);

      console.log("Calculated:", valuesList);

      if (valuesList.length === 0) return "";

      return valuesList.join(", ");
    }
  }
});