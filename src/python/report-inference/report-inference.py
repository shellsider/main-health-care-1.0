#!/usr/bin/env python
import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
from pdf2image import convert_from_path
from pytesseract import image_to_string
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
API_KEY = os.getenv("API_KEY")
if not API_KEY:
    print("API_KEY not found. Please set it in the .env file.", file=sys.stderr)
    sys.exit(1)
genai.configure(api_key=API_KEY)

def extract_text_from_pdf(pdf_path):
    try:
        images = convert_from_path(pdf_path)
        extracted_text = ""
        for i, image in enumerate(images):
            extracted_text += f"\n--- Page {i + 1} ---\n"
            extracted_text += image_to_string(image)
        return extracted_text
    except Exception as e:
        return f"Error extracting text from PDF: {e}"

def generate_inference(prompt):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating inference: {e}"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No PDF file path provided", file=sys.stderr)
        sys.exit(1)
    pdf_path = sys.argv[1]

    extracted_text = extract_text_from_pdf(pdf_path)
    
    # Example prompt: Adjust instructions as needed.
    prompt = extracted_text + """
    
Provide inferences and plausible remedies based on the data.
- List the type of test.
- Do not include the doctor's name; just provide concise, data point-wise information.
- Indicate if the person is healthy, moderately healthy, or unhealthy.
- Summarize key values in a tabular format and mark those out of the normal range.
- Include three segments: 'Inferences', 'Plausible Remedies', and 'Disclaimer'.
"""

    result = generate_inference(prompt)
    print(result)
