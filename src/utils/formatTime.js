import fecha from 'fecha';


export default function formatTime(time) {
  return fecha.format(time, 'hh:mm:ss.SSS A');;
};
