import { http, HttpResponse } from "msw";
import { storage } from "../services/storage";
import documentsData from "../documents.json";

storage.initialize(documentsData);

export const handlers = [
  http.get("/api/documents", () => {
    const documents = storage.getData();
    return HttpResponse.json(documents);
  }),

  http.put("/api/documents", async ({ request }) => {
    const documents = await request.json();
    storage.setData(documents);
    return HttpResponse.json(documents);
  }),
];
