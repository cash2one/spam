#!/usr/bin/env python2.7
# coding: utf-8

import requests
import json
import time
import random
import sys
from cookie import get_cookie
from showapi import laifudao
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
from util import get_t, headers, what_to_say, parse_ups, mongjiala, extract_cookies
from mysql import sql_user_weibo_content

def parse_params(s):   # parse string like this: uid=5353880302&fnick=御姐范凡白&sex=f
    ret = dict()
    s_l = s.split('&')
    for x in s_l:
        x_l = x.split('=')
        if x[0]=='uid':
            ret['uid'] = x[1]
        if x[0]=='fnick':
            ret['fnick'] = x[1]
    return ret
def follow_item_checker(o):
    if o.has_key('class') and o['class']==['follow_item', 'S_line2']:
        return True
    else:
        return False
def checkuser(phonenumber):
    url = 'http://weibo.com/signup/v5/formcheck'
    headers = {
        'Accept':'*/*',
        'Accept-Encoding':'gzip, deflate, sdch',
        'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
        'Connection':'keep-alive',
        'Content-Type':'application/x-www-form-urlencoded',
        'Host':'weibo.com',
        'Referer':'http://weibo.com/signup/signup.php?lang=zh-cn',
        'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36',
        'X-Requested-With':'XMLHttpRequest',
        }
    data = {
        'type':'mobilesea',
        'zone':'0086',
        'value':'{}'.format(phonenumber),
        'from':'',
        '__rnd':'1438414785889',
        }
    s = requests.Session()
    res = s.get(url=url, params=data, headers=headers, cookies=get_cookie(url='http://weibo.com/signup/signup.php?lang=zh-cn'), timeout=3)
    return res

class weibo():
    def __init__(self, username='cainiaocome@gmail.com', password='jialin0204'):
        self.firefox = webdriver.Firefox()
        self.firefox.delete_all_cookies()
        self.is_login = False
        self.username = username
        self.password = password
    def check_login_status(self):
        self.cookies = extract_cookies(self.firefox)
        return 'login_sid_t' in self.cookies.keys()  # if we have logged in, this cookie will be set
    def search_link(self, keyword):
        soup = BeautifulSoup(self.firefox.page_source)
        alla = soup.find_all(name='a')
        for a in alla:
            try:
                href = a['href']
            except KeyError:
                continue
            if href.find(keyword) != -1:
                print href
                return href
    def login(self, username='', password=''):
        if username!='':
            self.username = username
        if password!='':
            self.password = password
        self.firefox.delete_all_cookies()
        login_url = 'http://weibo.com/login.php'
        self.firefox.get(login_url)
        time.sleep(3)
        login_input = self.firefox.find_element_by_css_selector('#pl_login_form > div.W_login_form > div:nth-child(1) > div > input')
        login_input.clear()
        login_input.send_keys(self.username)
        password_input = self.firefox.find_element_by_css_selector('#pl_login_form > div.W_login_form > div:nth-child(2) > div > input')
        password_input.clear()
        password_input.send_keys(self.password)
        login_button = self.firefox.find_element_by_css_selector('#pl_login_form > div.W_login_form > div.info_list.login_btn > div:nth-child(1) > a')
        login_button.click()
        time.sleep(6)
        self.is_login = True
    def post(self, data=''):
        while not self.check_login_status():
            print 'firefox not logged in'
            time.sleep(1)
        self.firefox.get('http://weibo.com/home')
        post_input = self.firefox.find_element_by_css_selector('#v6_pl_content_publishertop > div > div.input > textarea')
        post_input.clear()
        post_input.send_keys(data)
        post_input.send_keys(Keys.CONTROL, Keys.ENTER)
        #post_url = 'http://weibo.com/aj/mblog/add?ajwvr=6&__rnd={}'.format(get_t())
        #data = {
        #    'location':'v6_content_home',
        #    'appkey':'',
        #    'style_type':'1',
        #    'pic_id':'',
        #    'text':'go go go',
        #    'pdetail':'',
        #    'rank':'0',
        #    'rankid':'',
        #    'module':'stissue',
        #    'pub_type':'dialog',
        #    '_t':'0',
        #    }
        #headers = {
        #    'Accept':'*/*',
        #    'Accept-Encoding':'gzip, deflate',
        #    'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
        #    'Cache-Control':'no-cache',
        #    'Connection':'keep-alive',
        #    'Content-Type':'application/x-www-form-urlencoded',
        #    'Origin':'http://weibo.com',
        #    'Pragma':'no-cache',
        #    'Pragma':'no-cache',
        #    'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36',
        #    'X-Requested-With':'XMLHttpRequest',
        #}
        #print 'post started'
        #s = requests.Session()
        #res = s.post(url=post_url, headers=headers, cookies=self.extract_cookies(), data=data)
        #res_json = json.loads(res.text)
        #print '-'*86
        #print post_url
        #print '-'*86
        #print res.request.headers
        #print '-'*86
        #print res_json['code'], res_json['msg']
    def fan(self, uid):
        self.login()
        fan_url = 'http://weibo.com/u/{}'.format(uid)
        self.firefox.get(fan_url)
        fan_button = self.firefox.find_element_by_css_selector('#Pl_Official_Headerv6__1 > div > div > div.shadow.S_shadow > div.pf_opt > div > div:nth-child(1) > a')
        fan_button.click()
    def get_fan_list(self, uid): # return fan list, [ {'uid':'000000', 'fnick':'god'} ]
        ret = list()
        self.login()
        self.firefox.get('http://weibo.com/u/{}'.format(uid))
        self.firefox.get(self.search_link('follow?relate=fans'))
        time.sleep(6)
        soup = BeautifulSoup(self.firefox.page_source)
        print soup
        for x in soup.find_all(follow_item_checker):
            ret.append(x['action-data'])
        return ret
    def quit(self):
        self.firefox.quit()

def main():
    data = ''
    weibo_tmp = weibo()
    while True:
        try:
            #l = laifudao()
            #for x in l:
            #    if len(x['content'])<140:
            #        break
            for up in parse_ups():
                print up
                time.sleep(60)
                #weibo_tmp.login(up['username'], up['password'])
                weibo_content = json.loads(sql_user_weibo_content('Subham@sina.com')['weibo_content'])
                weibo_tmp.post(random.choice(weibo_content))
        except:
            t,v,_ = sys.exc_info()
            print t,v
        this_time_sleep = random.randint(1800,3600)
        print 'this_time_sleep:', this_time_sleep
        time.sleep(this_time_sleep)

def test():
    parse_params('uid=5353880302&fnick=御姐范凡白&sex=f')

if __name__=='__main__':
    main()
