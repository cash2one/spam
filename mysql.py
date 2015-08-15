#!/usr/bin/env python2.7
#coding=utf-8

import time
import random
import string
import pymysql

def sql_user_weibo_content(username):
    conn=pymysql.connect(host='localhost',user='root',passwd='jialin,0204',db='weibo', charset='utf8', cursorclass=pymysql.cursors.DictCursor)
    cur=conn.cursor()
    cur.execute('select * from content where username="{}"'.format(username))
    ret = cur.fetchall()  # list of dict
    cur.close()
    conn.close()

    return ret[0]['weibo_content']

def main():
    ret = sql_user_weibo_content('Subham@sina.com')
    print ret

if __name__=='__main__':
    main()
