from db.connect import con

def get_recommend(id,num):
    cursor = con.cursor()
    cursor.execute(f"SELECT Count(*) FROM Recommend WHERE ID='{id}' and Post_Num={num};")
    return cursor.fetchone()[0]

def get_recommend_num(num):
    cursor = con.cursor()
    cursor.execute(f"SELECT Count(*) FROM Recommend WHERE Post_Num={num};")
    return cursor.fetchone()[0]

def add_recommend(id,num):
    cursor = con.cursor()
    cursor.execute(f"INSERT INTO Recommend VALUES('{id}','{num}');")
    con.commit()