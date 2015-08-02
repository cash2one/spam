#!/usr/bin/env python2.7
# coding: utf-8

import requests
import json
import time
import random
from cookie import get_cookie
from showapi import laifudao
from selenium import webdriver

phone = 13269682237

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
    def __init__(self, username, passwd):
        self.firefox = webdriver.Firefox()
        self.firefox.delete_all_cookies()
        self.is_login = False
        self.username = username
        self.passwd = passwd
    def login(self):
        login_url = 'http://weibo.com/login.php'
        self.firefox.get(login_url)
        time.sleep(3)
        login_input = self.firefox.find_element_by_css_selector('#pl_login_form > div.W_login_form > div:nth-child(1) > div > input')
        login_input.clear()
        login_input.send_keys(self.username)
        passwd_input = self.firefox.find_element_by_css_selector('#pl_login_form > div.W_login_form > div:nth-child(2) > div > input')
        passwd_input.clear()
        passwd_input.send_keys(self.passwd)
        login_button = self.firefox.find_element_by_css_selector('#pl_login_form > div.W_login_form > div.info_list.login_btn > div:nth-child(1) > a')
        login_button.click()
        time.sleep(6)
        self.is_login = True
    def post(self, data):
        if not self.is_login:
            self.login()
        front_page_button = self.firefox.find_element_by_css_selector('#pl_common_top > div > div > div.gn_position > div.gn_nav > ul > li:nth-child(1) > a')
        front_page_button.click()
        time.sleep(3)
        post_input = self.firefox.find_element_by_css_selector('#v6_pl_content_publishertop > div > div.input > textarea')
        post_input.send_keys(data)
        post_button = self.firefox.find_element_by_css_selector('#v6_pl_content_publishertop > div > div.func_area.clearfix > div.func > a')
        post_button.click()
    def quit(self):
        self.firefox.quit()

def main():
    l = laifudao()
    for x in l:
        print '-'*86
        print x['content']
    weibo_tmp = weibo('cainiaocome@gmail.com', 'jialin0204')
    weibo_tmp.post(random.choice(l)['content'])
    time.sleep(30)
    weibo_tmp.quit()

if __name__=='__main__':
    main()
