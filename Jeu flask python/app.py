from flask import Flask, jsonify, render_template, send_from_directory
import requests
from bs4 import BeautifulSoup
import os

app = Flask(__name__)


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)



def obtenir_mot():
    response = requests.get("https://trouve-mot.fr/api/random")
    if response.status_code == 200:
        data = response.json()
        if data and len(data) > 0:
            return data[0]['name']
    return None

def get_definitions(word):
    definitions = []

    
    wiktionary_url = f"https://fr.wiktionary.org/wiki/{word}"
    wiktionary_response = requests.get(wiktionary_url)
    if wiktionary_response.status_code == 200:
        wiktionary_soup = BeautifulSoup(wiktionary_response.text, 'html.parser')
        definition_tags = wiktionary_soup.find_all('ol')
        if definition_tags:
            for definition in definition_tags:
                definitions.append(definition.text.strip())

    return definitions

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/jeu')
def jeu():
    return render_template('jeu.html')



@app.route('/mot_aleatoire', methods=['GET'])
def mot_aleatoire():
    mot = obtenir_mot()
    if mot:
        definitions = get_definitions(mot)
        return jsonify({"mot": mot, "definitions": definitions})
    else:
        return jsonify({"message": "Impossible d'obtenir un mot aléatoire."}), 500

if __name__ == '__main__':
    app.run(debug=True)
