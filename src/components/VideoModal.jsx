import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const VideoModal = ({
  isOpen,
  onClose,
  videoUrl,
  embedCode,
  title,
  isVertical = false,
}) => {
  const modalRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const scrollPositionRef = useRef({ x: 0, y: 0 });

  const [hasInteracted, setHasInteracted] = useState(false);
  //Only start listening for fullscreen changes after the user interacts with the modal:
  useEffect(() => {
    if (!hasInteracted) return;

    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, [hasInteracted]);

  // Set hasInteracted to true when modal opens
  useEffect(() => {
    if (isOpen) setHasInteracted(true);
  }, [isOpen]);

  // Save scroll position when opening modal and restore when closing
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position when opening modal
      scrollPositionRef.current = {
        x: window.scrollX || window.pageXOffset,
        y: window.scrollY || window.pageYOffset,
      };

      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      // Enable scrolling when modal is closed
      document.body.style.overflow = "auto";
      document.body.classList.remove("modal-open");

      // Restore scroll position when modal is closed
      if (scrollPositionRef.current) {
        setTimeout(() => {
          window.scrollTo(
            scrollPositionRef.current.x,
            scrollPositionRef.current.y
          );
        }, 0);
      }
    }

    return () => {
      // Cleanup function
      document.body.style.overflow = "auto";
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Detect fullscreen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(
        document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
      );
    };

    // Use a single event listener with proper feature detection
    const eventName = document.fullscreenEnabled
      ? "fullscreenchange"
      : document.webkitFullscreenEnabled
      ? "webkitfullscreenchange"
      : document.mozFullScreenEnabled
      ? "mozfullscreenchange"
      : "MSFullscreenChange";

    document.addEventListener(eventName, handleFullScreenChange);

    return () => {
      document.removeEventListener(eventName, handleFullScreenChange);
    };
  }, []);
  // Close modal when clicking outside the content
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Transform YouTube watch URLs to embed URLs with parameters
  const getEmbedUrl = (url) => {
    let embedUrl = url;

    // YouTube watch URL
    if (url.includes("youtube.com/watch")) {
      // Extract video ID
      const videoId = new URL(url).searchParams.get("v");
      // Optimize for performance in fullscreen
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&fs=1&enablejsapi=1`;
    }
    // YouTube shorts URL
    else if (url.includes("youtube.com/shorts")) {
      const shortsId = url.split("/").pop().split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${shortsId}?autoplay=1&rel=0&showinfo=0&modestbranding=1&fs=1&color=white&iv_load_policy=3&playsinline=0&enablejsapi=1&origin=${window.location.origin}&widget_referrer=${window.location.origin}`;
    }
    // YouTube short URL
    else if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop().split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1&fs=1&color=white&iv_load_policy=3&playsinline=0&enablejsapi=1&origin=${window.location.origin}&widget_referrer=${window.location.origin}`;
    }
    // Vimeo URL
    else if (url.includes("vimeo.com")) {
      const vimeoId = url.replace("https://vimeo.com/", "").split("/")[0];
      embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1&transparent=0&quality=1080p`;
    }

    return embedUrl;
  };

  // Render the video content
  const renderVideoContent = () => {
    // If direct embed code is provided, use it instead
    if (embedCode) {
      return (
        <div
          className={`embed-container ${isVertical ? "vertical" : ""}`}
          dangerouslySetInnerHTML={{ __html: embedCode }}
        />
      );
    }

    // Otherwise use our normal video embed logic
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      return (
        <iframe
          src={getEmbedUrl(videoUrl)}
          title={title}
          frameBorder="0"
          loading="eager"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          width="100%"
          height="100%"
          importance="high"
          referrerPolicy="origin"
        ></iframe>
      );
    } else if (videoUrl.includes("vimeo.com")) {
      return (
        <iframe
          src={getEmbedUrl(videoUrl)}
          title={title}
          frameBorder="0"
          loading="eager"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          width="100%"
          height="100%"
          importance="high"
          referrerPolicy="origin"
        ></iframe>
      );
    } else {
      return (
        <video controls autoPlay preload="auto" playsInline>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  // Portal to render modal at the root level of the DOM
  const modalContent = (
    <div
      className={`video-modal-backdrop ${
        isFullScreen ? "fullscreen-active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`video-modal-content ${isVertical ? "vertical" : ""}`}
      >
        <button
          className="video-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <h3 className="video-modal-title">{title}</h3>

        <div className={`video-modal-player ${isVertical ? "vertical" : ""}`}>
          {renderVideoContent()}
        </div>
      </div>
    </div>
  );

  // Use portal to render the modal at the root of the document
  return ReactDOM.createPortal(modalContent, document.body);
};

VideoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  videoUrl: PropTypes.string.isRequired,
  embedCode: PropTypes.string,
  title: PropTypes.string.isRequired,
  isVertical: PropTypes.bool,
};

export default VideoModal;
