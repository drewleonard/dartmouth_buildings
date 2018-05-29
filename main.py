from app import app
from flask import render_template

# PAGE ROUTING
@app.route('/')
def index():
    return render_template('index.html')

# RUN APP FROM COMMAND LINE
if __name__ == '__main__':
    app.run()