from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io
from google import genai 
import os
from dotenv import load_dotenv
import time
from tenacity import retry, stop_after_attempt, wait_exponential_jitter
from google.api_core import exceptions

load_dotenv()

description_cache = {}

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@retry(
    stop=stop_after_attempt(5),
    wait=wait_exponential_jitter(initial=2, max=60),
    retry=lambda e: isinstance(e, (exceptions.ResourceExhausted, exceptions.ServiceUnavailable))
)
def get_gemini_description(result):
    if result in description_cache:
        return description_cache[result]
        
    prompt = f"""Provide a valid JSON response for the skin disease {result}. 
    Include exactly these keys: "description", "severity", "risks", and "treatments". 
    The value for EACH key MUST be a list of strings. 
    Format every string in the list to start with a bolded topic, exactly like this: "**Topic Name:** Detailed explanation." """
    response = client.models.generate_content(model='gemini-2.5-flash', contents=prompt)
    
    desc = response.text.strip()
    description_cache[result] = desc 
    return desc

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO('Skin_Disease.pt')

@app.get("/")
async def root():
    return {"message": "Skin Disease Classification API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    
    image = Image.open(io.BytesIO(contents)).convert('RGB')
    
    results = model(image, verbose=False)
    predicted_class_index = results[0].probs.top1
    confidence = float(results[0].probs.top1conf) * 100
    result = results[0].names[predicted_class_index].split('.', 1)[-1].strip()
    
    
    try:
        description = get_gemini_description(result)
        time.sleep(1)
    except Exception as e:
        print(f"Gemini Error: {e}") 
        description = "AI description currently unavailable. Please consult a professional."
    
    return {"disease": result, "confidence": round(confidence, 2), "description": description}