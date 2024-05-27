// exclude fields from object
export const excludeFields = <
  T extends Record<string, any>,
  Key extends keyof T
>(
  obj: T,
  keys: Key[]
): Omit<T, Key> => {
  const result = { ...obj };
  keys.forEach((key) => {
    delete obj[key];
  });
  return result;
};

export const preparePhoneNumber = (phone: string) => {
  return phone.split("").reverse().slice(0, 10).reverse().join("");
};
