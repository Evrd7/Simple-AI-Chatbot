from flask import Flask, render_template, request, jsonify
import openai
import os

app = Flask(__name__)

openai.api_key = os.getenv("openai_api_key", "")

client = openai.OpenAI()

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("user_input", "")

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant."},
                {"role": "user", "content": user_input},
            ],
            max_tokens=100,
            temperature=0.7,
        )
        reply = response.choices[0].message.content
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    return jsonify({"reply": reply})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render assigns a dynamic port
    app.run(host="0.0.0.0", port=port, debug=True)






#def main():
#    print("Welcome to the AI Text Generator!")
#    while True:
#        user_input = input("You: ")
#        if user_input.lower() in ["exit", "quit"]:
#            print("Goodbye!")
#            break
#
#        response_text = get_ai_response(user_input)
#
#        print("AI:", response_text)

#def get_ai_response(prompt):
#    try:
#        response = client.chat.completions.create(
#        model = "gpt-3.5-turbo",
#        messages=[
#            {"role": "system", "content": "You are a helpful AI assistant. Please answer clearly."},
#            {"role": "user", "content": prompt}
#        ],
#        max_tokens=100
#        )
#    except Exception as e:
#        print("Error calling the API:", e)
#        return "Sorry, something went wrong."
#
#    return response.choices[0].message.content

#if __name__ == "__main__":
#    main()
