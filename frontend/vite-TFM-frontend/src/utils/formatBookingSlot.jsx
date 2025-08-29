// Función para formatear el slot de reserva y mostrar la hora de inicio y fin en formato HH:MM
// Recibe un objeto slot con startDateTime y endDateTime
export function formatBookingSlot(slot) {
  // Convertir la fecha de inicio a formato hora:minuto
  const start = new Date(slot.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // Convertir la fecha de fin a formato hora:minuto
  const end = new Date(slot.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // Devuelve el string con el rango de horas
  return `${start} - ${end}`;
}
