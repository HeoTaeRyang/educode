from connect import con
cursor = con.cursor()

def get_all_user():
    cursor.execute("SELECT * FROM User;")
    return cursor.fetchall()

def get_user(id):
    cursor.execute(f"SELECT * FROM User WHERE ID='{id}';")
    return cursor.fetchall()

def add_user(id,pw,name):
    cursor.execute(f"INSERT INTO User VALUES('{id}','{pw}','{name}',0);")
    con.commit()

def del_user(id):
    cursor.execute(f"DELETE FROM User WHERE ID='{id}';")
    con.commit()