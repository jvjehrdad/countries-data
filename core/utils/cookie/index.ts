export const getCookie = (key: string): string | null => {
  const nameEqual = key + '=';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(nameEqual) === 0) return cookie.substring(nameEqual.length);
  }
  return null;
};

export const setCookie = (key: string, value: string, expiresInSeconds?: number) => {
  let expires = '';
  if (expiresInSeconds) {
    const date = new Date();
    date.setTime(date.getTime() + expiresInSeconds * 1000);
    expires = '; expires=' + date.toUTCString();
  } else {
    expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
  }
  document.cookie = `${key}=${value}${expires}; path=/`;
};

export const eraseCookie = (key: string) => {
  document.cookie = `${key}=; Max-Age=-99999999; path=/`;
};
