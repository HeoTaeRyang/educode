from db.connect import con


MAX_PAGE = 10

def get_post_current_num():
    cursor = con.cursor()
    cursor.execute("SELECT MAX(Number) FROM Offer_Post;")
    res = cursor.fetchone()[0]
    if res:
        return res
    else:
        return 0

def get_post_num():
    cursor = con.cursor()
    cursor.execute("SELECT COUNT(*) FROM Offer_Post WHERE Is_Del = 0;")
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
    cursor.execute(f"SELECT Number,Title,Header,Writer_id,Datetime,View_Count FROM Offer_Post WHERE Is_Del = 0 ORDER BY Number DESC LIMIT {MAX_PAGE} OFFSET {page-1} * {MAX_PAGE};")
    return cursor.fetchall()

def get_page_post_views(page):
    cursor = con.cursor()
    cursor.execute(f"SELECT Number,Title,Header,Writer_id,Datetime,View_Count FROM Offer_Post WHERE Is_Del = 0 ORDER BY View_Count DESC, Number DESC LIMIT {MAX_PAGE} OFFSET {page-1} * {MAX_PAGE};")
    return cursor.fetchall()

#입력한 번호의 글 리턴
def get_content_post(num):
    cursor = con.cursor()
    cursor.execute(f"SELECT Title,Header,Writer_id,Datetime,View_Count,Content FROM Offer_Post WHERE Number={num};")
    return cursor.fetchone()

#글 추가
def add_post(title,header,writer_id,datetime,content):
    cursor = con.cursor()
    num = get_post_current_num()
    cursor.execute(f"INSERT INTO Offer_Post VALUES('{num+1}','{title}','{header}','{writer_id}','{datetime}',0,'{content}',0);")
    con.commit()

#글 삭제
def del_post(num):
    cursor = con.cursor()
    cursor.execute(f"UPDATE Offer_Post SET Is_Del = 1 WHERE Number='{num}';")
    con.commit()

#조회수 증가
def add_views_post(num):
    cursor = con.cursor()
    cursor.execute(f"UPDATE Offer_Post SET View_Count = View_Count + 1 WHERE Number='{num}';")
    con.commit()
    
# 상위 조회수 구인 게시글 3개
def get_top_offer_post():
    cursor = con.cursor()
    cursor.execute("SELECT Title FROM Offer_Post ORDER BY View_Count DESC LIMIT 3;")
    return cursor.fetchall()

# 최신 구인 게시글 3개
def get_recent_offer_post():
    cursor = con.cursor()
    cursor.execute("SELECT Title, Writer_id, Content FROM Offer_Post ORDER BY Datetime DESC LIMIT 3;")
    return cursor.fetchall()