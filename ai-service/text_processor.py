import re
import nltk
import pandas as pd
from nltk.corpus import stopwords
# nltk.download('stopwords')

stop_words = set(stopwords.words("english"))

def tokenize_words(text: str):
    text = "" if pd.isna(text) else str(text).lower()
    text = re.sub(r"http\S+", " ", text)
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    tokens = text.split()
    tokens = [t for t in tokens if t not in stop_words]
    return tokens

def clean_label(tok: str):
    tok = "" if tok is None else str(tok).lower().strip()
    tok = re.sub(r"\s+", " ", tok)
    # keep + # . - for c++, c#, node.js, etc.
    tok = re.sub(r"[^a-z0-9\+\#\.\- ]", " ", tok)
    tok = re.sub(r"\s+", " ", tok).strip()
    return tok