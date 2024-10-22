from flask import Flask, render_template, request, jsonify, session, redirect
from models import db
from models import User
import os

app = Flask(__name__)
app.secret_key = os.urandom(24) 

@app.route('/')
def main():
    userid = session.get('userid', None)
    return render_template('main.html', userid=userid)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        data = request.get_json()
        
        userid = data.get('userid', '')
        username = data.get('username', '')
        email = data.get('email', '')
        password = data.get('password', '')
        
        if not (userid and username and email and password):
            success = False
            message = "입력 되지 않은 빈칸이 있습니다."
            
        elif len(username) < 3 or len(username) > 20: 
            success = False
            message = "사용자 이름은 최소 3자, 최대 20자 입니다."
        
        elif len(password) < 6: 
            success = False
            message = "비밀번호 길이는 최소 6자 입니다."
        
        else:
            success = True
            message = None
            
        if not success:
            return jsonify({'success' : success, 'message' : message}), 400
        
        else:
            user = User()
            user.userid = userid
            user.username = username
            user.email = email
            user.password = password
            
            db.session.add(user)
            db.session.commit()
         
            return jsonify({'success' : success, 'message' : message}), 201
        
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        data = request.get_json()
        
        userid = data.get('userid', '')
        password = data.get('password', '')
        
        if not (userid and password):
            success = False
            message = "아이디 또는 비밀번호가 입력되지 않았습니다."
        
        else:
            user = User.query.filter_by(userid=userid).first()
            
            if user and user.password == password:
                session['userid'] = userid
                success = True
                message = "로그인에 성공했습니다."
            else:
                success = False
                message = "잘못된 아이디 또는 비밀번호 입니다."
    
    if not success:
        return jsonify({'success' : success, 'message' : message}), 400
    else:
        return jsonify({'success' : success, 'message' : message}), 200

@app.route('/logout', methods=['POST'])
def logtout():
    session.pop('userid', None)
    return redirect('/')

if __name__ == '__main__':
    basedir = os.path.abspath(os.path.dirname(__file__))
    dbfile = os.path.join(basedir, 'db.sqlite')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + dbfile
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    with app.app_context():
        db.create_all()
    
    app.run(host='127.0.0.1', port=5000, debug=True)