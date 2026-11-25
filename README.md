# IntelliDerm — AI Skin Disease Classification Platform

IntelliDerm lets a user upload a photo of a skin condition and get an AI-powered preliminary assessment: the predicted condition, a confidence score, and an easy-to-read breakdown of its description, severity, risks, and treatments. The platform also points users toward nearby clinics for professional follow-up.

> ⚠️ **Medical disclaimer:** IntelliDerm is an informational and educational tool. It is **not** a medical device and does **not** provide a diagnosis. Always consult a qualified dermatologist or healthcare professional for any skin concern.

## Table of Contents

- [How It Works](#how-it-works)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Limitations](#limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Author](#author)

## How It Works

```
 Browser (Next.js)  ──image──▶  FastAPI /predict
                                   │
                                   ├─ YOLO classifier (Skin_Disease.pt) → disease + confidence
                                   └─ Gemini 2.5 Flash → description, severity, risks, treatments
                                   │
 Browser (Next.js)  ◀──JSON────────┘
```

1. The user uploads an image on the web app.
2. The frontend sends it to the FastAPI backend as multipart form data.
3. A YOLO classification model predicts the most likely condition and its confidence.
4. The predicted condition is sent to Google Gemini, which returns structured, topic-bolded information. Results are cached in memory, and requests are retried with exponential backoff on rate limits.
5. The frontend displays the result with the uploaded image.

## Features

- Image upload with instant AI classification
- Confidence score for each prediction
- Structured condition info: description, severity, risks, and treatments
- Nearby clinics section for professional follow-up
- Clear medical disclaimer
- Light and dark mode (follows system preference)
- Responsive UI
- Graceful fallback message if the AI description service is unavailable

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui (Radix UI), lucide-react, next-themes |
| Backend | Python, FastAPI |
| Classification model | Ultralytics YOLO (`Skin_Disease.pt`), Pillow |
| Descriptions | Google Gemini (`gemini-2.5-flash`) via `google-genai` |
| Reliability | `tenacity` retries with exponential backoff and jitter, in-memory response cache |

## Project Structure

```
Intelliderm---A-Skin-Disease-Platform/
├── backend/
│   ├── main.py            # FastAPI app: /predict endpoint, YOLO + Gemini logic
│   ├── Skin_Disease.pt    # Trained YOLO classification weights
│   └── .env               # GEMINI_API_KEY (not committed)
├── frontend/
│   ├── app/               # Next.js App Router (layout.tsx, page.tsx, globals.css)
│   ├── components/        # Navbar, hero, results, clinics, disclaimer, footer, UI
│   ├── tailwind.config.ts
│   ├── components.json    # shadcn/ui config
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later (required by Next.js 16) and npm
- Python 3.10 or later
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/devadathmb/Intelliderm---A-Skin-Disease-Platform.git
cd Intelliderm---A-Skin-Disease-Platform
```

### 2. Start the backend

```bash
cd backend
python -m venv venv

# macOS / Linux
source venv/bin/activate
# Windows
venv\Scripts\activate

pip install fastapi "uvicorn[standard]" python-multipart ultralytics pillow \
            google-genai python-dotenv tenacity google-api-core
```

Create `backend/.env`:

```env
GEMINI_API_KEY=your_api_key_here
```

Run the server:

```bash
uvicorn main:app --reload --port 8000
```

The API is now available at `http://localhost:8000`.

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` and upload an image.

## API Reference

### `GET /`

Health check.

```json
{ "message": "Skin Disease Classification API is running" }
```

### `POST /predict`

Classifies an uploaded skin image.

**Request:** `multipart/form-data` with a `file` field containing the image.

```bash
curl -X POST http://localhost:8000/predict -F "file=@sample.jpg"
```

**Response:**

```json
{
  "disease": "Condition name",
  "confidence": 92.35,
  "description": "{ \"description\": [...], \"severity\": [...], \"risks\": [...], \"treatments\": [...] }"
}
```

- `confidence` is a percentage rounded to two decimals.
- `description` is the Gemini response as a JSON string. Each key holds a list of strings in the form `**Topic:** explanation`.
- If Gemini is unavailable, `description` falls back to a generic "consult a professional" message.

## Configuration

| Variable | Where | Purpose |
|----------|-------|---------|
| `GEMINI_API_KEY` | `backend/.env` | Authenticates requests to the Gemini API |

The backend allows CORS from `http://localhost:3000`, and the frontend calls `http://localhost:8000/predict`. If you deploy, update the allowed origin in `main.py` and the API URL in `app/page.tsx` (ideally via environment variables).

## Limitations

- Predictions are limited to the conditions the model was trained on and can be wrong, especially with poor lighting, blur, or unusual presentations.
- Generated descriptions come from a language model and may contain inaccuracies.
- The description cache is in memory and resets when the server restarts.
- Not validated for clinical use.

## Roadmap

- [ ] Move API URLs and CORS origins to environment variables
- [ ] Expand and rebalance the training dataset
- [ ] Persist the description cache
- [ ] Image quality checks before inference
- [ ] Dockerized setup for the full stack

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## Author

**Devadath MB** — [@devadathmb](https://github.com/devadathmb)
