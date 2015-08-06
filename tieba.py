#!/usr/bin/env python2.7
#coding=utf-8

import sys
import time
import random
import requests
import multiprocessing
import signal
import os
import json
import pickle
from selenium import webdriver

headers = {'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate, utf-8',
            'Accept-Language':'en-US,en;q=0.5',
            'Connection':'keep-alive',
            'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20140924 Firefox/24.0 Iceweasel/24.8.1'
          }
def downloadImageFile(imgUrl, cookies, headers=headers, filename='b.jpg'):
    r = requests.get(url=imgUrl) # here we need to set stream = True parameter
    with open(filename, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024):
            if chunk: # filter out keep-alive new chunks
                f.write(chunk)
                f.flush()
        f.close()

class tieba():
    def __init__(self, username='cainiaocome@163.com', passwd='jialinjialin'):
        self.username = username
        self.passwd = passwd
        self.baidu_cookie_path = 'baidu.cookie'
        self.cookies = dict()
        if os.path.exists(self.baidu_cookie_path):
            self.cookies = pickle.load(open(self.baidu_cookie_path, 'rb'))
    def get_t(self):  # fucking crazy param
        t = time.time()
        t = int(t*1000)
        return t
    def update_cookies(self):
        if os.path.exists(self.baidu_cookie_path):
            self.cookies = pickle.load(open(self.baidu_cookie_path, 'rb'))
        else:
            self.firefox = webdriver.Firefox()
            self.firefox.delete_all_cookies()
            self.login()
            firefox_cookies = self.firefox.get_cookies()
            for firefox_cookie in firefox_cookies:
                self.cookies[firefox_cookie['name']] = firefox_cookie['value']
            pickle.dump(self.cookies, open(self.baidu_cookie_path, 'wb'))
    def login(self):
        self.firefox.get('https://passport.baidu.com/v2/?login')
        self.firefox.execute_script('document.getElementById("TANGRAM__PSP_3__userName").setAttribute("value", "{}"); console.log("wtf")'.format(self.username))
        self.firefox.execute_script('document.getElementById("TANGRAM__PSP_3__password").setAttribute("value", "{}"); console.log("wtf")'.format(self.passwd))
        self.firefox.execute_script('document.getElementById("TANGRAM__PSP_3__submit").click()')
        time.sleep(2)
    def quit(self):
        self.firefox.quit()
    def get_recommend(self):
        self.update_cookies()
        recommend_url = 'http://zhidao.baidu.com/question/api/recommend?rn={}&t={}'.format(10, self.get_t())
        res = requests.get(url=recommend_url, headers=headers, cookies=self.cookies)
        return res.text
    def run(self):
        self.firefox.get('http://tieba.baidu.com/p/{}'.format(random.randint(1,10000000000)))
        time.sleep(3)
        js = 'var q=document.documentElement.scrollTop=10000000'
        self.firefox.execute_script(js) # scroll to bottom
        editor = self.firefox.find_element_by_css_selector('#ueditor_replace')
        editor.send_keys('ceshi')
        time.sleep(3)
        self.firefox.find_element_by_xpath('//*[@id="tb_rich_poster"]/div[3]/div[3]/div/a/span/em').click()
        time.sleep(6)
        self.firefox.quit()

def main():
    try:
        tieba_tmp = tieba()
        tieba_tmp.update_cookies()
        while True:
            try:
                r = json.loads(tieba_tmp.get_recommend(), encoding='utf-8')['list']
            except TypeError:
                continue
            else:
                break
        for x in r:
            print x['qid'], x['title']
        if hasattr(tieba_tmp, 'firefox'):
            tieba_tmp.quit()
    except:
        t,v,_ = sys.exc_info()
        print t,v
        if hasattr(tieba_tmp, 'firefox'):
            tieba_tmp.quit()

if __name__=='__main__':
    main()
