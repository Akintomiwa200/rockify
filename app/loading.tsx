

'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';



const Loading = () => {
 

  useEffect(() => {
    // GSAP Animation for spinner
    gsap.fromTo(
      '.spinner',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, repeat: -1, yoyo: true }
    );

    // GSAP Animation for text fade-in
    gsap.fromTo(
      '.loading-text',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );

 

  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
      {/* Animated Spinner */}
      <div className="flex flex-col justify-center items-center">
        <div className="spinner w-16 h-16 border-4 border-t-4 border-white rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold loading-text">Loading, please wait...</p>
      </div>

      {/* Progress Bar */}
      <div className="w-56 h-2 bg-white bg-opacity-30 rounded-full overflow-hidden mt-6">
        <div className="progress-bar h-full bg-white w-0"></div>
      </div>

      
    </div>
  );
};

export default Loading;
