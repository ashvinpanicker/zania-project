# Zania-project

A document management interface with drag-and-drop functionality and image previews (and Cat GIFS!).

## Features

- Responsive grid layout with 3 cards in the first row and 2 in the second
- Drag and drop reordering of documents
- Image preview modal with ESC key support
- Loading spinners for images
- Cache data in local storage

## Running the Project

Prerequisite Node > v18

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the browser to the URL shown in the terminal

## Usage

- Drag any card to reorder them
- Click on any image to view the full image in a modal
- Press ESC or click the close button to exit the image preview

## API endpoints

- GET `/api/documents`: Retrieve all documents
- PUT `/api/documents`: Update all documents

## Architecture

The application is containerized using Docker
We can run it using `docker-compose up`

`nginx.conf` with:

- Nginx for static file serving
- CORS configuration for API access
