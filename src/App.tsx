import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { DocumentCard } from "./components/DocumentCard";
import { ImageModal } from "./components/ImageModal";
import { SaveStatus } from "./components/SaveStatus";
import { api } from "./services/api";
import { useAutoSave } from "./hooks/useAutoSave";
import { Document } from "./types";

function App() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedImage, setSelectedImage] = useState<Document | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const { isSaving, lastSaved } = useAutoSave(documents, hasChanges);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const data = await api.fetchDocuments();
        setDocuments(data);
      } catch (error) {
        console.error("Failed to load documents:", error);
      }
    };
    loadDocuments();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setDocuments((items) => {
        const oldIndex = items.findIndex((item) => item.type === active.id);
        const newIndex = items.findIndex((item) => item.type === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      setHasChanges(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Document Manager
        </h1>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={documents.map((doc) => doc.type)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.type}
                  id={doc.type}
                  title={doc.title}
                  image={doc.image}
                  onImageClick={() => setSelectedImage(doc)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {selectedImage && (
          <ImageModal
            image={selectedImage.image}
            title={selectedImage.title}
            onClose={() => setSelectedImage(null)}
          />
        )}

        <SaveStatus isSaving={isSaving} lastSaved={lastSaved} />
      </div>
    </div>
  );
}

export default App;
