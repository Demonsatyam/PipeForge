import requests

payload = {
  "nodes": [
    { "id": "customInput-1", "type": "customInput", "position": { "x": 100, "y": 200 }, "data": {} },
    { "id": "llm-1", "type": "llm", "position": { "x": 400, "y": 200 }, "data": {} }
  ],
  "edges": [
    { "id": "e1", "source": "customInput-1", "target": "llm-1" }
  ]
}

res = requests.post("http://127.0.0.1:8000/pipelines/parse", json=payload)
print(res.status_code)
print(res.text)
