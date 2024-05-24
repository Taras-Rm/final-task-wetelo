// exclude fields from user
export const excludeFields = (user: Object, keys: string[]) => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
};
