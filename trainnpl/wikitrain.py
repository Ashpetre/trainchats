import sys
import wikipediaapi

wiki_wiki = wikipediaapi.Wikipedia("en")
train_articles = ["Train", "High-speed rail", "Steam locomotive", "Rail transport"]

def get_wiki_text(topic):
    page = wiki_wiki.page(topic)
    return page.text if page.exists() else ""

train_data = "\n".join([get_wiki_text(article) for article in train_articles])

with open("train_data.text", "w",encoding = 'utf-8') as file: 
    file.write(train_data)
