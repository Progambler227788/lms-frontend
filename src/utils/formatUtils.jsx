export const formatCategory = (text) => {
  return text
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


export const formatDuration = (minutes) => {
  if (isNaN(minutes) || minutes < 0) return '0m'; // Handle invalid inputs
  
  if (minutes < 60) {
    return `${minutes}m`; // Show just minutes if under 1 hour
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  // Only show remaining minutes if they exist
  return remainingMinutes > 0 
    ? `${hours}h ${remainingMinutes}m` 
    : `${hours}h`;
};

export const getRandomColorClass = () => {
  const colors = [
    ['bg-red-100', 'text-red-600'],
    ['bg-green-100', 'text-green-600'],
    ['bg-yellow-100', 'text-yellow-600'],
    ['bg-blue-100', 'text-blue-600'],
    ['bg-purple-100', 'text-purple-600'],
    ['bg-pink-100', 'text-pink-600'],
    ['bg-indigo-100', 'text-indigo-600'],
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
// Generate random tailwind background & text color classes