#!/usr/bin/env python2.7
#coding=utf-8

import time
import random
import string
import pymysql
import chardet
import json

def sql_user_weibo_content(username):
    conn=pymysql.connect(host='localhost',user='root',passwd='jialin,0204',db='weibo', charset='utf8', cursorclass=pymysql.cursors.DictCursor)
    cur=conn.cursor()
    cur.execute('select * from content where username="{}"'.format(username))
    ret = cur.fetchone()  # list of dict
    cur.close()
    conn.close()

    return ret

def main():
    weibo_content = random.choice(json.loads(sql_user_weibo_content('Subham@sina.com')['weibo_content']))
    print weibo_content

if __name__=='__main__':
    main()
