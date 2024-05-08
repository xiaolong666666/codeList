const ONE_DAY_MS = 1000 * 60 * 60 * 24;

function setCookie(name, value, day) {
  const data = `${name}=${encodeURIComponent(value)}`;
  const now = Date.now();
  const expireTime = now + day * ONE_DAY_MS;
  const expires = new Date(expireTime).toGMTString();
  document.cookie = `${data}; expires=${expires}`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return "no defined cookie";
}

function removeCookie(name) {
  setCookie(name, "", -1);
}
