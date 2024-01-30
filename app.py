from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html')


@app.route("/robots.txt")
def robots_dot_txt():
    return "User-agent: *\nAllow: /"

if __name__ == '__main__':
    app.run(debug=True)
