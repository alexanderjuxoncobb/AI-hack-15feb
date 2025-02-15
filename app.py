from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from openai import OpenAI
from dotenv import load_dotenv
import base64

load_dotenv()

app = Flask(__name__)

# CORS Configuration
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


# Add a test endpoint
@app.route("/api/test", methods=["GET"])
def test():
    return jsonify({"message": "API is working!"})


@app.route("/api/analyze-image", methods=["POST"])
def analyze_image():
    print("Received request to /api/analyze-image")
    try:
        # Get all data from the request
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
                            I need the following information from the image:
                            
                            Name of product
                            Name of brand
                            Weight (you should make a guess based on the image and the name of product if not provided)
                            Country photo was taken in (hardcoded to UK)
                            Additional context provided by user: {context}
                            Reason for scanning: {reason}
                            Barcode (if provided): {barcode}

                            Return the information in a JSON format. Do not provide any other text except for the JSON object. 
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
            max_tokens=500,
        )

        print("HERE")
        print(response.choices[0].message.content)
        print("HERE DONE")

        return jsonify(
            {"success": True, "analysis": response.choices[0].message.content}
        )

    except Exception as e:
        print(f"Error analyzing image: {e}")  # Debug log
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001, host="0.0.0.0")
