

export default function setUserSettings(settings, storage) {
  return storage.setItem('reactPerfToolSettings', JSON.stringify(settings));
}
