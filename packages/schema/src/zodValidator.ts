import { z } from 'zod';
import { setIn } from 'final-form';

export const validateWithZod = <T>(schema: z.Schema<T>) => (values: T) => {
  const result = schema.safeParse(values);
  
  if (result.success) return undefined;

  return result.error.issues.reduce((acc, issue) => {
    return setIn(acc, issue.path.join('.'), issue.message);
  }, {});
};