from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key = True)
    userid = db.Column(db.String(32))
    username = db.Column(db.String(32))
    email = db.Column(db.String(32))
    password = db.Column(db.String(32))