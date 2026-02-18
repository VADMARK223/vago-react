export const getWsUrl = () => {
  return `ws://${location.hostname}:5555/ws`;
};

export const getCookie = (name: string) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${escaped}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : '';
};
