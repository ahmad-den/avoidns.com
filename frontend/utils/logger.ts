export function logError(message: string, error: any) {
  console.error(`Error: ${message}`, error);
  
  // In a real application, you might want to send this to a logging service
  // or write to a file. For now, we'll just log to console.
  
  // Example of how you might log to a file (requires backend setup):
  // fetch('/api/log', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ message, error }),
  // });
}


