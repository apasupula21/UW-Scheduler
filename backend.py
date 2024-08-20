import sqlite3
from flask import Flask, request, jsonify

app = Flask(__name__)

conn = sqlite3.connect('application.db')

cursor = conn.cursor()

def check_string(s):
    if s is not None and s != '':
        return True
    else:
        return False

def createUser(name, email):
    if (not check_string(name) or not check_string(email)):
        error = 'Invalid name or email'
    cursor.execute('''
    INSERT INTO USERS (NAME, EMAIL) VALUES (?, ?) ''', (name, email))
    conn.commit()

def addClass(userid, dept, classnum):
    cursor.execute('SELECT ID FROM CLASSES WHERE DEPT = ? AND CLASS_NUM = ?', (dept, classnum))
    class_id = cursor.fetchone()
    cursor.execute('''
    INSERT INTO USER_CLASSES (USER_ID, CLASS_ID) VALUES (?, ?) ''', (userid, class_id))
    conn.commit()

def removeClass(userid, dept, classnum):
    cursor.execute('SELECT ID FROM CLASSES WHERE DEPT = ? AND CLASS_NUM = ?', (dept, classnum))
    class_id = cursor.fetchone()
    cursor.execute('''
    DELETE FROM USER_CLASSES WHERE USER_ID = ? AND CLASS_ID = ? ''', (userid, class_id))

def showClasses(userid):
    cursor.execute('SELECT * FROM USER_CLASSES WHERE USER_ID = ?', (userid))
    classes = cursor.fetchone()
    return classes

def findMatches(dept, classnum):
    cursor.execute('SELECT ID FROM CLASSES WHERE DEPT = ? AND CLASS_NUM = ?', (dept, classnum))
    class_id = cursor.fetchone()
    cursor.execute('''
    SELECT FROM USER_CLASSES WHERE CLASS_ID = ?''', (class_id))
    matches = cursor.fetchone()
    return matches
    
