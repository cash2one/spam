#!/usr/bin/env python2.7
#coding=utf-8

import sys
import time
import random
import requests
import multiprocessing
import signal
import os
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

class tieba(spam):
    def __init__(self):
        multiprocessing.Process.__init__(self)
        signal.signal(signal.SIGTERM, self.on_signal_term)
        self.firefox = None
        self.cookies = dict()
    def on_signal_term(self, a, b):  # what's a and b?
        if self.firefox != None:
            self.firefox.quit()  # this will fail if driver is not able to response
    def getproxy(self):
        proxy = random.choice(get_proxy_list())
        ip = proxy['ip']
        port = proxy['port']
        myProxy = '{}:{}'.format(ip, port)
        print myProxy
        proxy = Proxy({
            'proxyType': ProxyType.MANUAL,
            'httpProxy': myProxy,
            'ftpProxy': myProxy,
            'sslProxy': myProxy,
            'noProxy': '' # set this value as desired
        })
        return proxy
    def run(self):
        self.firefox = webdriver.Firefox()
        self.firefox.delete_all_cookies()
        self.firefox.get('https://passport.baidu.com/v2/?login')
        self.firefox.execute_script('document.getElementById("TANGRAM__PSP_3__userName").setAttribute("value", "496243912@qq.com"); console.log("wtf")')
        self.firefox.execute_script('document.getElementById("TANGRAM__PSP_3__password").setAttribute("value", "jialin0204"); console.log("wtf")')
        self.firefox.execute_script('document.getElementById("TANGRAM__PSP_3__submit").click()')
        time.sleep(2)
        #self.firefox.get('http://tieba.baidu.com/p/3591753667')
        self.firefox.get('http://tieba.baidu.com/p/{}'.format(random.randint(1,10000000000)))
        #self.firefox.execute_script('document.getElementById("ueditor_replace").setAttribute("value", "wo hui luan shuo?"); console.log("wtf")')
        #self.firefox_cookies = self.firefox.get_cookies()
        #for firefox_cookie in self.firefox_cookies:
        #    self.cookies[firefox_cookie['name']] = firefox_cookie['value']
        #self.data = {
        #    'ie':'utf-8',
        #    'kw':'英雄联盟',
        #    'fid':'309955',
        #    'tid':'3928759427',
        #    'vcode_md5':'',
        #    'floor_num':'453',
        #    'rich_text':'1',
        #    'tbs':'1872243fc090ee691438146807',
        #    'content':'wohuiluanshuo?',
        #    'files':'[]',
        #    'mouse_pwd':'119,121,119,99,126,120,121,126,126,70,126,99,127,99,126,99,127,99,126,99,127,99,126,99,127,99,126,99,127,70,122,127,123,119,121,125,70,126,124,121,121,99,120,121,119,14381468461790',
        #    'mouse_pwd_t':'1438146847179',
        #    'mouse_pwd_isclick':'0',
        #    '__type__':'reply',
        #}
        #res = requests.post(url='http://tieba.baidu.com/f/commit/post/add', headers=headers, cookies = self.cookies, data=self.data)
        #print res.text.encode('utf-8')
        time.sleep(3)
        js = 'var q=document.documentElement.scrollTop=10000000'
        self.firefox.execute_script(js) # scroll to bottom
        editor = self.firefox.find_element_by_css_selector('#ueditor_replace')
        editor.send_keys('ceshi')
        time.sleep(3)
        self.firefox.find_element_by_xpath('//*[@id="tb_rich_poster"]/div[3]/div[3]/div/a/span/em').click()
        time.sleep(6)
        self.firefox.quit()
