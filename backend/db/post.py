from db.connect import con

MAX_PAGE = 10

def get_post_current_num():
    cursor = con.cursor()
    cursor.execute("SELECT MAX(Number) FROM Post;")
    res = cursor.fetchone()[0]
    if res:
        return res
    else:
        return 0

def get_post_num():
    cursor = con.cursor()
    cursor.execute("SELECT COUNT(*) FROM Post WHERE Is_Del = 0;")
    return cursor.fetchone()[0]

#페이지 개수 리턴
def get_max_page():
    num = get_post_num()
    if num % MAX_PAGE != 0:
        return num // MAX_PAGE + 1
    else:
        return num // MAX_PAGE

#입력한 페이지의 글들 리턴
def get_page_post_date(page):
    cursor = con.cursor()
    cursor.execute(f"SELECT Number,Title,Writer_id,Datetime,View_Count FROM Post WHERE Is_Del = 0 ORDER BY Number DESC LIMIT {MAX_PAGE} OFFSET {page-1} * {MAX_PAGE};")
    return cursor.fetchall()

def get_page_post_views(page):
    cursor = con.cursor()
    cursor.execute(f"SELECT Number,Title,Writer_id,Datetime,View_Count FROM Post WHERE Is_Del = 0 ORDER BY View_Count DESC, Number DESC LIMIT {MAX_PAGE} OFFSET {page-1} * {MAX_PAGE};")
    return cursor.fetchall()

#입력한 번호의 글 리턴
def get_content_post(num):
    cursor = con.cursor()
    cursor.execute(f"SELECT Title,Writer_id,Datetime,View_Count,Content FROM Post WHERE Number={num};")
    return cursor.fetchone()

#글 추가
def add_post(title,writer_id,datetime,content):
    cursor = con.cursor()
    num = get_post_current_num()
    cursor.execute(f"INSERT INTO Post VALUES('{num+1}','{title}','{writer_id}','{datetime}',0,'{content}',0);")
    con.commit()

#글 삭제
def del_post(num):
    cursor = con.cursor()
    cursor.execute(f"UPDATE Post SET Is_Del = 1 WHERE Number='{num}';")
    con.commit()

#조회수 증가
def add_views_post(num):
    cursor = con.cursor()
    cursor.execute(f"UPDATE Post SET View_Count = View_Count + 1 WHERE Number='{num}';")
    con.commit()
    
# 상위 조회수 자유 게시글 3개
def get_top_post():
    cursor = con.cursor()
    cursor.execute("SELECT Title FROM Post ORDER BY View_Count DESC LIMIT 3;")
    return cursor.fetchall()

def get_id(num):
    cursor = con.cursor()
    cursor.execute(f"SELECT id FROM Post WHERE Number={num};")
    return cursor.fetchone()[0]