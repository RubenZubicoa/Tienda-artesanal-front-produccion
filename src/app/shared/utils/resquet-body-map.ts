
export function mapperOnlyPropertiesWithValue<T extends Object>(obj: T) {
  Object.keys(obj).forEach((key: string) => {
      if (isEmptyValue(obj[key as keyof T]))
        delete obj[key as keyof T];
  });
  return obj;
}

const isEmptyValue = (property: any) => {
  return property === null || property === undefined || property === '' || (Array.isArray(property) && property.length === 0);
}