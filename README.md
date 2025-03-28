# AI Image Generator

A modern text-to-image generation application built with OpenAI's DALL-E 3 model and GPT-4o prompt enhancement. This application showcases Generative AI capabilities with a clean, responsive user interface built with React and the shadcn/ui design system.

## Features

- **Text-to-Image Generation**: Transform your text descriptions into high-quality images using OpenAI's DALL-E 3
- **Prompt Enhancement**: Automatic optimization of user prompts with GPT-4o for better generation results
- **Image History**: All generated images are saved to a PostgreSQL database for future reference
- **Responsive Design**: Clean, modern UI that works on desktop and mobile devices
- **Instant Download**: Save generated images directly to your device

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **AI Services**: OpenAI API (GPT-4o and DALL-E 3)
- **Development**: Vite, TSX

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express application
│   ├── services/           # Service modules
│   │   └── openai.ts       # OpenAI API integration
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database access layer
│   └── db.ts               # Database connection
└── shared/                 # Shared code between frontend and backend
    └── schema.ts           # Database schema and types
```

## API Endpoints

- `POST /api/generate-image`: Generate an image from a text prompt
- `GET /api/image-generations`: Get all image generation history
- `GET /api/image-generations/recent/:limit`: Get the most recent image generations
- `GET /api/image-generations/:id`: Get a specific image generation by ID

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- OpenAI API key

### Environment Variables

Create a `.env` file in the root directory with the following:

```
DATABASE_URL=postgresql://username:password@localhost:5432/databasename
OPENAI_API_KEY=your_openai_api_key
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up the database:
   ```
   npm run db:push
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Enter a descriptive text prompt in the input field
2. Click "Generate Image" to create a new image
3. View, download, or share the generated image
4. Browse your generation history in the Recent Creations section

## Future Improvements

- User authentication and personal image galleries
- More control over image generation parameters
- Image editing and variation capabilities
- Social sharing features

## License

This project is licensed under the MIT License - see the LICENSE file for details.