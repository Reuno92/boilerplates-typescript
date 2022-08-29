/**
 * A typeguarded version of `instanceof Error` for NodeJS.
 * @author Joseph JDBar Barron
 * @link https://dev.to/jdbar
 */
export default function instanceOfNodeError<T extends new (...args: never) => Error>(value: unknown, errorType: TypeErrorConstructor): value is InstanceType<T> & NodeJS.ErrnoException {
  return value instanceof errorType;
}
