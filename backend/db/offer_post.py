from db.connect import con

def get_offer_post_num():
    cursor = con.cursor()
    cursor.execute("SELECT Post_num FROM Post_Nums WHERE Post_Type = 'Offer_Post';")
    return cursor.fetchone()[0]