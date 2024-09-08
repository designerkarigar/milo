export const SetValueInLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const GetValueInLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return parseInt(value);
};
export const key = "token";
export const Union = 1;
export const Zero = 0;
