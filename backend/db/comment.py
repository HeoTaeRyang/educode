from db.connect import con

#댓글 개수 리턴
def get_comment_num_post(post_type, num):
    cursor = con.cursor()
    cursor.execute(f"SELECT Count(*) FROM Comment WHERE Post_Type = '{post_type}' and Post_Number={num};")
    res = cursor.fetchone()[0]
    if res:
        return res
    else:
        return 0

#댓글들 리턴
def get_comment_post(post_type,num):
    cursor = con.cursor()
    cursor.execute(f"SELECT Writer_id,Datetime,Content FROM Comment WHERE Post_Type = '{post_type}' and Post_Number={num};")
    return cursor.fetchall()