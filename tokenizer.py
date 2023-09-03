import json

with open('src/assets/kural/kurals.json', 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

tokens = []
for item in data:
    kurals = item.get("kurals", [])
    for kural in kurals:
        l1 = kural["l1"].strip()
        l2 = kural["l2"].strip()
        words = l1.split(" ") + l2.split(" ")
        tokens.append(words)
tokens = [item for sublist in tokens for item in sublist]
print(len(tokens))
with open('words.json', 'w', encoding='utf-8') as file:
    json.dump(tokens, file, ensure_ascii=False)

tokens = list(set(tokens))
print(len(tokens))
with open('unique.json', 'w', encoding='utf-8') as file:
    json.dump(tokens, file, ensure_ascii=False)