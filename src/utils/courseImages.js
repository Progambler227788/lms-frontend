// utils/courseImages.js
const COURSE_IMAGES = {
  CODING: [
    'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg', // Code screen
    'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg', // Developer working
  ],
  CYBER_SECURITY: [
    'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg', // Shield icon
    'https://images.pexels.com/photos/3568520/pexels-photo-3568520.jpeg', // Hacker concept
  ],
  APPLICATION_DEV: [
    'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg', // App development
    'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg', // Mobile phones
  ],
  GAME_DEV: [
    'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg', // Game controller
    'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg', // VR headset
  ],
  BLOCKCHAIN: [
    'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg', // Cryptocurrency
    'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg', // Blockchain nodes
  ],
  DEV_OPS: [
    'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg', // Cloud servers
    'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg', // Network diagram
  ],
  PROGRAMMING: [
    'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg', // HTML code
    'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg', // Laptop
  ],
  MACHINE_LEARNING: [
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg', // AI brain
    'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg', // Data visualization
  ],
  DEFAULT: [
    'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg', // Graduation
    'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg', // Books
  ]
};

export const getCourseImage = (category) => {
  // Normalize category names (handles spaces, case sensitivity, etc.)
  const normalizedCategory = category?.toUpperCase().replace(/\s+/g, '_');
  const categoryKey = Object.keys(COURSE_IMAGES).find(key => 
    key === normalizedCategory || 
    key === normalizedCategory?.replace('_', '')
  ) || 'DEFAULT';
  
  const images = COURSE_IMAGES[categoryKey] || COURSE_IMAGES.DEFAULT;
  return images[Math.floor(Math.random() * images.length)];
};