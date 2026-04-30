export const convertTo64 = async (content) => {
  // btoa is Latin1-only; blog HTML may include Unicode
  return btoa(unescape(encodeURIComponent(content)));
};

export const convetToHTML = async (html) => {
  const value = await atob(html);
  console.log("this is back to html" + value);
};
