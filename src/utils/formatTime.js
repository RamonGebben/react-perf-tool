import fecha from 'fecha';


export default function formatTime(time) {
  return fecha.format(new Date(time), 'hh:mm:ss.SSS A');
}
