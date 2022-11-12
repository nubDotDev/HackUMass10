from flask import Flask
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import pipeline 

app = Flask(__name__)

# we need to load a tokenizer and the model, you can usually find this on the model card
tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")
model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")

@app.route("/")
def hello_world():
    inputs = ["I am happy when I kill", "you are the sweetest person ever"] 
    pipe = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
    result = pipe(inputs)
    return result


if __name__ == "__main__":
    app.run()