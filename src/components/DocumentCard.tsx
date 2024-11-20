import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DocumentCardProps {
  id: string;
  title: string;
  image: string;
  onImageClick: () => void;
}

export function DocumentCard({
  id,
  title,
  image,
  onImageClick,
}: DocumentCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
  };

  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 ${
        isDragging ? "scale-105 shadow-xl" : ""
      }`}
      onClick={onImageClick}
    >
      <div
        className="relative aspect-[4/3] bg-gray-100"
        {...attributes}
        {...listeners}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onClick={onImageClick}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 cursor-pointer">
          Click to preview
        </p>
      </div>
    </div>
  );
}
