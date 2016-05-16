

export default function getUserSettings(storage) {
  const userSettings = Object.assign({}, JSON.parse(storage.getItem('reactPerfToolSettings')));
  return userSettings || {};
}
