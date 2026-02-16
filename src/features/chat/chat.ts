export const WS_URL = 'ws://localhost:5555/ws';

export const getCookie = (name: string) => {
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : '';
};
