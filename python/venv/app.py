from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

"""
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import pipeline 

# we need to load a tokenizer and the model, you can usually find this on the model card
tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")
model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")

inputs = ["i hate you piyush im going to kill you"] 

pipe = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
result = pipe(inputs)
print(result)
"""

if __name__ == "__main__":
    app.run()