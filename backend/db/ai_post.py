from connect import con
cursor = con.cursor()

def get_ai_post_num():
    cursor.execute("SELECT Post_num FROM Post_Nums WHERE Post_Type = 'AI_Post';")
    return cursor.fetchone()[0]