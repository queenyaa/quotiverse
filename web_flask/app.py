from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__, static_url_path='/static')


@app.route('/', strict_slashes="False")
def home():
    """This is to render the home page"""
    return render_template('home.html')


@app.route('/register', methods=['GET', 'POST'], strict_slashes="False")
def register():
    """Render the register page"""
    return render_template('register.html')


@app.route('/user', strict_slashes="Flase")
def welcome():
    """ Redirected from user login """
    return render_template('user.html')


@app.route('/login', strict_slashes="False")
def login():
    """Render the log in page"""
    return render_template('login.html')


if __name__ == '__main__':
    """Run the app"""
    app.run(host='0.0.0.0', port='5000', debug=True)