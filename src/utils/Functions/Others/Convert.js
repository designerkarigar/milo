export const convertTo64 = async (content) => {
  const value = await btoa(content);
  return value;
};

export const convetToHTML = async (html) => {
  const value = await atob(html);
  console.log("this is back to html" + value);
};
