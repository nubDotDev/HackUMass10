from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import pipeline 

app = Flask(__name__)
CORS(app)

# we need to load a tokenizer and the model, you can usually find this on the model card
tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")
model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")
pipe = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

@app.route("/")
def index():
    return "Error"

@app.route("/sentiment-analysis", methods=["GET", "POST"])
def sentiment_analysis():
    if request.method != "POST":
        return "Error"
    req_json = request.get_json()
    if "paragraphs" in req_json:
        res = []
        for paragraph in req_json["paragraphs"]:
            res.append(pipe(paragraph))
        return res
    if "paragraph" in req_json:
        return pipe(req_json["paragraph"])
    elif "text" in req_json:
        return pipe([req_json["text"]])
    return []


if __name__ == "__main__":
    app.run()