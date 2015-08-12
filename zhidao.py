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
from util import headers

def downloadImageFile(imgUrl, cookies, headers=headers, filename='b.jpg'):
    r = requests.get(url=imgUrl) # here we need to set stream = True parameter
    with open(filename, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024):
            if chunk: # filter out keep-alive new chunks
                f.write(chunk)
                f.flush()
        f.close()

class zhidao():
    def __init__(self, username='cainiaocome@163.com', passwd='jialinjialin'):
        self.username = username
        self.passwd = passwd
        self.baidu_cookie_path = 'baidu.cookie'
        self.cookies = dict()
        if os.path.exists(self.baidu_cookie_path):
            self.cookies = pickle.load(open(self.baidu_cookie_path, 'rb'))
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
    def ajax(self, filepath):
        headers.update({
            'Host':'zhidao.baidu.com',
            'Origin':'http://zhidao.baidu.com',
            'Pragma':'no-cache',
            'Referer':'http://zhidao.baidu.com/question/1734099915854102907.html?entry=qb_ihome_tag_%E7%99%8C%E7%97%87_0_%E7%99%8C%E7%97%87',
            'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36',
            'X-Requested-With':'ShockwaveFlash/18.0.0.160',
            })
        ajax_url = 'http://zhidao.baidu.com/submit/ajax/'
        files = {'file': open(filepath, 'rb')}
        s = requests.Session()
        res = s.post(url=ajax_url, headers=headers, cookies=self.cookies, files=files) 
        print res.text
        print res.request.headers
    def run(self):  # dont use this
        self.firefox.get('http://zhidao.baidu.com/p/{}'.format(random.randint(1,10000000000)))
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
        #zhidao_tmp = zhidao()
        #zhidao_tmp.update_cookies()
        #while True:
        #    try:
        #        r = json.loads(zhidao_tmp.get_recommend(), encoding='utf-8')['list']
        #    except TypeError:
        #        continue
        #    else:
        #        break
        #for x in r:
        #    print x['qid'], x['title']
        #if hasattr(zhidao_tmp, 'firefox'):
        #    zhidao_tmp.quit()
        zhidao_tmp = zhidao()
        zhidao_tmp.update_cookies()
        zhidao_tmp.ajax('ss.png')
    except:
        t,v,_ = sys.exc_info()
        print t,v
        if hasattr(zhidao_tmp, 'firefox'):
            zhidao_tmp.quit()

if __name__=='__main__':
    main()
