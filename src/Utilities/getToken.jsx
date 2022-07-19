export const getToken = () => {
  return localStorage.getItem("every-token") || "";
};
