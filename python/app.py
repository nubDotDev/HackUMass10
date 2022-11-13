from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import pipeline 

app = Flask(__name__)
CORS(app)

# we need to load a tokenizer and the model, you can usually find this on the model card
tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")
model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")

@app.route("/")
def index():
    print("request.json")
    # if request.method != "POST":
    #     return "Error"
    inputs = ["good question."] 
    pipe = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
    result = pipe(inputs)
    return result

@app.route("/sentiment-analysis", methods=["GET", "POST"])
def sentiment_analysis():
    if request.method != "POST":
        return "Error"
    # inputs = ["I am happy when I kill", "you are the sweetest person ever"] 
    inputs = [request.get_json()["text"]]
    pipe = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
    result = pipe(inputs)
    return result


if __name__ == "__main__":
    app.run()