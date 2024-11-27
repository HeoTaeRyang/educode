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

# 상위 포인트 사용자 3명
def get_top_point_user():
    cursor = con.cursor()
    cursor.execute("SELECT Name, Point FROM User ORDER BY Point DESC LIMIT 3;")
    return cursor.fetchall()