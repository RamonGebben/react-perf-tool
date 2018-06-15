export default function formatTime(time) {
  return (new Date(time)).toTimeString().split(' ')[0];
}
