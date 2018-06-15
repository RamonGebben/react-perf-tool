export default function getUserSettings(storage) {
  try {
    const result = JSON.parse(storage.getItem('reactPerfToolSettings'));
    return Object.assign({}, result);
  } catch (_) {
    return {};
  }
}
