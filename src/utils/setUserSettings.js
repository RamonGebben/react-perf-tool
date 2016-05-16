

export default function setUserSettings(settings) {
  return window.localStorage.setItem('reactPerfToolSettings', JSON.stringify(settings));
}
