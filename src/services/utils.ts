export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, "").trim();
};

export const formatTime = (time: string): string => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
