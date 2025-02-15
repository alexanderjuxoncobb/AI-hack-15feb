from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from openai import OpenAI
from dotenv import load_dotenv
import base64
import json
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)

# CORS Configuration remains the same...
CORS_CONFIG = {
    "origins": ["http://localhost:3000"],
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"],
    "expose_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True,
}

CORS(app, resources={r"/api/*": CORS_CONFIG})

# Initialize OpenAI client
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# Initialize Gemini
genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))
gemini_model = genai.GenerativeModel("gemini-pro")


def get_product_origin(product_name, brand_name, country):
    prompt = f"""Given the following product and its brand:
    - {product_name}
    - {brand_name}
    - {country}
    search specifically for where this exact product is manufactured, or where the ingredients are imported from.
    Return only a list of country names"""

    response = gemini_model.generate_content(prompt)
    return response.text


def calculate_carbon_footprint(product_name, brand_name, weight):
    prompt = f"""Calculate the approximate carbon footprint for the {product_name} 
    made by {brand_name} of {weight} quantity/weight. Apply relevant emission factors. 
    Return strictly as a number of grams."""

    response = gemini_model.generate_content(prompt)
    return response.text


def get_health_considerations(product_name, brand_name, user_requirements):
    prompt = f"""Investigate any health considerations for this specific product {product_name} 
    by the brand {brand_name} (e.g., allergens, additives, dietary suitability), 
    factoring in {user_requirements} if relevant. Keep it brief (at most 5 very short bullet points), 
    each one specifying the specific ingredient and its harms to the persons requirements."""

    response = gemini_model.generate_content(prompt)
    return response.text


def get_unique_equivalents():
    prompt = f"You are given a numerical value 66.6g representing a CO2 carbon footprint (in kg CO2 or equivalent units). Your task is to come up with a REALLY UNIQUE and fun, common everyday activity that produces an equivalent carbon footprint. For example, if the carbon footprint is 2 kg CO2, you might suggest that it is roughly equivalent to taking the London Underground tube for 20 minutes. Provide a relatable everyday activity along with a brief explanation of how you determined the equivalence."
    response = gemini_model.generate_content(prompt)
    return response.text


@app.route("/api/analyze-image", methods=["POST"])
def analyze_image():
    print("Received request to /api/analyze-image")
    try:
        data = request.json
        image_data = data.get("image")
        barcode = data.get("barcode")
        context = data.get("context")
        reason = data.get("reason")

        if not image_data:
            return jsonify({"success": False, "error": "No image data received"}), 400

        # Remove the data URL prefix if present
        if "base64," in image_data:
            image_data = image_data.split("base64,")[1]

        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": f"""
                            Analyze this product image and return a JSON object with the following fields:
                            {{
                                "name_of_product": "product name",
                                "name_of_brand": "brand name",
                                "weight": "weight or estimated weight",
                                "country": "UK",
                                "additional_context": "{context}",
                                "scan_reason": "{reason}",
                                "barcode": "{barcode}"
                            }}
                            Return only the JSON object, no additional text. If you cannot find the weight you should make a guess.
                            """,
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{image_data}"
                            },
                        },
                    ],
                }
            ],
            max_tokens=300,
            temperature=0.3,
        )

        # Get the response content
        analysis_content = response.choices[0].message.content.strip()
        print("Raw API Response:", analysis_content)  # Debug log

        # Clean the response of markdown formatting
        if analysis_content.startswith("```"):
            analysis_content = analysis_content.strip("`")
            if analysis_content.startswith("json\n"):
                analysis_content = analysis_content[5:]

        # After getting OpenAI analysis, enrich with Gemini data
        try:
            openai_analysis = json.loads(analysis_content)

            # Enrich with Gemini data
            origin = get_product_origin(
                openai_analysis["name_of_product"],
                openai_analysis["name_of_brand"],
                openai_analysis["country"],
            )

            carbon_footprint = calculate_carbon_footprint(
                openai_analysis["name_of_product"],
                openai_analysis["name_of_brand"],
                openai_analysis["weight"],
            )

            health_info = get_health_considerations(
                openai_analysis["name_of_product"],
                openai_analysis["name_of_brand"],
                context,
            )

            unique_equivalents = get_unique_equivalents()

            # Add Gemini data to response
            enriched_analysis = {
                **openai_analysis,
                "origin_countries": origin,
                "carbon_footprint_grams": carbon_footprint,
                "health_considerations": health_info,
                "unique_equivalents": unique_equivalents,
            }
            print("nice")

            print(
                "Response:",
                jsonify({"success": True, "analysis": enriched_analysis}).get_data(
                    as_text=True
                ),
            )
            return jsonify({"success": True, "analysis": enriched_analysis})

        except json.JSONDecodeError as e:
            print("fuck")
            print(f"JSON Parsing Error: {e}")
            return jsonify({"success": False, "error": str(e)}), 500

    except Exception as e:
        print(f"Error analyzing image: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001, host="0.0.0.0")
