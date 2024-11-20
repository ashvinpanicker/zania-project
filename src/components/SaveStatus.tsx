import React from "react";

interface SaveStatusProps {
  isSaving: boolean;
  lastSaved: Date | null;
}

export function SaveStatus({ isSaving, lastSaved }: SaveStatusProps) {
  const getTimeSinceLastSaved = () => {
    if (!lastSaved) return "Never saved";
    const seconds = Math.floor(
      (new Date().getTime() - lastSaved.getTime()) / 1000
    );
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-2">
      {isSaving ? (
        <>
          <div className="w-4 h-4 animate-spin text-blue-500" />
          <span className="text-sm text-gray-600">Saving...</span>
        </>
      ) : (
        <span className="text-sm text-gray-600">
          Last saved: {getTimeSinceLastSaved()}
        </span>
      )}
    </div>
  );
}
