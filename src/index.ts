/**
 * J'ai pour gérer un case d'usage aussi moisi. :)
 */
console.warn('TEST');
console.error('TEST AGAIN');

type YearDayType = 'numeric' | '2-digit' | undefined;

interface DateType {
  language: string | undefined;
  country: string | undefined;
  weekday: 'long' | 'short' | 'narrow' | undefined;
  month: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit' | undefined;
  year: YearDayType;
  day: YearDayType;
}

const makeMeAString = (
  arg: string | number | Date,
  options?: DateType
): string => {
  if (arg instanceof Date) {
    return arg.toLocaleDateString(
      options?.language && options?.country
        ? `${options.language}-${options.country}`
        : undefined,
      {
        weekday: options?.weekday,
        month: options?.month,
        year: options?.year,
        day: options?.day,
      }
    );
  }
  return arg.toString();
};
export default makeMeAString;
