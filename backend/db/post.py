from connect import con
cursor = con.cursor()

def get_post_num():
    cursor.execute("SELECT Post_num FROM Post_Nums WHERE Post_Type = 'Post';")
    return cursor.fetchone()[0]

def get_all_post():
    cursor.execute("SELECT * FROM Post WHERE Is_Del = 0;")
    return cursor.fetchall()

def get_post(num):
    cursor.execute(f"SELECT * FROM Post WHERE Number={num};")
    return cursor.fetchone()

def add_post(title,writer_id,datetime,content):
    cursor.execute(f"UPDATE Post_Nums SET Post_Num = Post_Num + 1 WHERE Post_Type = 'Post';")
    num = get_post_num()
    cursor.execute(f"INSERT INTO Post VALUES('{num}','{title}','{writer_id}','{datetime}',0,0,'{content}',0);")
    con.commit()

def del_post(num):
    cursor.execute(f"UPDATE Post SET Is_Del = 1 WHERE Number='{num}';")
    con.commit()   