import requests
from fastapi import FastAPI # type: ignore
from pydantic import BaseModel

app = FastAPI()

class PromptInput(BaseModel):
    prompt: str

@app.post("/generate")
def generate_text(data: PromptInput):
    res = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "mistral",
            "prompt": data.prompt,
            "stream": False
        }
    )
    output = res.json()
    return {"response": output["response"]}
