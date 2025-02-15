from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from openai import OpenAI
from dotenv import load_dotenv
import base64

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@app.route("/api/analyze-image", methods=["POST"])
def analyze_image():
    try:
        # Get the image data from the request
        image_data = request.json.get("image")

        # Remove the data URL prefix if present
        if "base64," in image_data:
            image_data = image_data.split("base64,")[1]

        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "What's in this image? Please analyze this product.",
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

        return jsonify(
            {"success": True, "analysis": response.choices[0].message.content}
        )

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
