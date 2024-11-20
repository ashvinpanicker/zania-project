import React, { useEffect } from "react";

interface ImageModalProps {
  image: string;
  title: string;
  onClose: () => void;
}

export function ImageModal({ image, title, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <p className="w-6 h-6 text-white">X</p>
        </button>

        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>

        <div className="relative aspect-video">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
