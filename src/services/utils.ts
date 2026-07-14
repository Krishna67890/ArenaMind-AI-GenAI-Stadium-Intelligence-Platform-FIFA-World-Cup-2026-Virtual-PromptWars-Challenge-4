export const sanitizeInput = (input: string): string => {
  if (!input) return "";
  return input
    .replace(/[<>]/g, "") // Remove basic tags
    .replace(/javascript:/gi, "") // Block javascript protocols
    .replace(/on\w+=/gi, "") // Remove inline event handlers
    .trim();
};

export const formatTime = (time: string): string => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
