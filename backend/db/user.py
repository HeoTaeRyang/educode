from db.connect import con

def get_all_user():
    cursor = con.cursor()
    cursor.execute("SELECT * FROM User;")
    return cursor.fetchall()

def get_user(id):
    cursor = con.cursor()
    cursor.execute(f"SELECT * FROM User WHERE ID='{id}';")
    return cursor.fetchall()

def add_user(id,pw,name):
    cursor = con.cursor()
    cursor.execute(f"INSERT INTO User VALUES('{id}','{pw}','{name}',0);")
    con.commit()

def del_user(id):
    cursor = con.cursor()
    cursor.execute(f"DELETE FROM User WHERE ID='{id}';")
    con.commit()

def add_point(id,point):
    cursor = con.cursor()
    cursor.execute(f"UPDATE User SET Point = Point + {point} WHERE ID='{id}';")
    con.commit()

def sub_point(id,point):
    cursor = con.cursor()
    cursor.execute(f"UPDATE User SET Point = Point - {point} WHERE ID='{id}';")
    con.commit()

def check_point(id,point):
    cursor = con.cursor()
    cursor.execute(f"SELECT Point from User WHERE ID = '{id}';")
    user_point = cursor.fetchone()[0]
    if user_point >= point:
        return 1
    else:
        return 0