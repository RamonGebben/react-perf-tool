

export default function getUserSettings() {
  const userSettings = Object.assign({}, JSON.parse(window.localStorage.getItem('reactPerfToolSettings')));
  return userSettings || {};
}
