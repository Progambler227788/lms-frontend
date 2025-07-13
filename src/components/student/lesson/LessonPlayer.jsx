import { useEffect, useRef, useState, useCallback } from 'react';
import { markLessonComplete } from '../../../services/lessonService';

export default function LessonPlayer({ lesson, courseId, onLessonComplete }) {
  const playerRef = useRef(null); // stores the YouTube player instance (used to control video)
  const intervalRef = useRef(null); // stores interval ID for checking playback time
  const [hasMarkedComplete, setHasMarkedComplete] = useState(false); //  ensures lesson is marked once
  const completionThreshold = 0.9; // 90% completion rate
  
  // Extracts video ID from any YouTube URL format
  // memoize the function
  // not rerender, freezing the function because remains same
  const getVideoId = useCallback((url) => {
    const regex = /(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }, []);
  
  // freeze untill courseid, lesson title, lesson compeletition state get changes
  const handleMarkComplete = useCallback(async () => {
    if (hasMarkedComplete) return;

    try {
      await markLessonComplete(courseId, lesson.title);
      setHasMarkedComplete(true);
      console.log(`✅ Marked "${lesson.title}" as completed`);

      if (typeof onLessonComplete === 'function') {
        onLessonComplete();
      }
    } catch (err) {
      console.error('❌ Failed to mark lesson as completed', err);
    }
  }, [courseId, hasMarkedComplete, lesson.title, onLessonComplete]);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      return new Promise((resolve) => {
        // if window object already present for yt
        if (window.YT) {
          resolve();
        } else {
          const tag = document.createElement('script');
          // <script src="https://www.youtube.com/iframe_api"></script>
          tag.src = 'https://www.youtube.com/iframe_api';
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          window.onYouTubeIframeAPIReady = resolve;
        }
      });
    };

    const setupPlayer = async () => {
      const videoId = getVideoId(lesson.content);
      if (!videoId) return;

      await loadYouTubeAPI();

      playerRef.current = new window.YT.Player('youtube-player', {
        videoId,
        events: {
          onReady: () => {
            console.log('🎥 Player ready');
          },
          onStateChange: (event) => {
            const player = playerRef.current;
            if (!player || typeof player.getDuration !== 'function') {
              console.warn('⏳ Player not ready yet');
              return;
            }

            if (event.data === window.YT.PlayerState.PLAYING) {
              const duration = player.getDuration();

              // polling every second to check has student watched 90% of lesson video

              intervalRef.current = setInterval(() => {
                const currentTime = player.getCurrentTime();
                if (!hasMarkedComplete && currentTime / duration >= completionThreshold) {
                  handleMarkComplete();
                  clearInterval(intervalRef.current);
                }
              }, 1000);
            }

            if (event.data === window.YT.PlayerState.ENDED) {
              handleMarkComplete();
              clearInterval(intervalRef.current);
            }

            if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.BUFFERING
            ) {
              clearInterval(intervalRef.current);
            }
          },
        },
      });
    };

    setupPlayer();
    setHasMarkedComplete(false); // reset when lesson changes

    return () => {
      clearInterval(intervalRef.current);
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
      // forcibly remove iframe
      const playerElement = document.getElementById('youtube-player');
      if (playerElement) {
        playerElement.innerHTML = '';
      }
    };
  }, [lesson, getVideoId, handleMarkComplete, hasMarkedComplete]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
      <h2 className="text-lg font-semibold">{lesson.title}</h2>
      <p className="text-sm text-gray-500 mb-2">{lesson.sectionTitle}</p>
      <div className="aspect-w-16 aspect-h-9 rounded overflow-hidden">
        <div id="youtube-player" className="w-full h-full" />
      </div>
    </div>
  );
}