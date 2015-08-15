#!/usr/bin/env python2.7
#coding=utf-8

import time
import random
import string

docx_url = 'http://pan.baidu.com/s/1i3EPV73'

key_words = [
    '易瑞沙', '特罗凯', '多吉美', '格列卫', '来那度胺', '替莫唑胺', '依维莫司', '索非布韦', '克唑替尼', '达卡它韦', '哈瓦尼', '万珂', '美罗华', '赫赛汀',
    ]

what_to_say = u'Q 1406483897，靶向抗癌药印度直邮，老公是印度人，外公开的药房，30年老字号，信誉良好；在加尔各答和新德里都设有分支，欢迎考察。易瑞沙, 特罗凯, 多吉美, 格列卫, 来那度胺, 替莫唑胺, 依维莫司, 索非布韦, 克唑替尼, 达卡它韦, 哈瓦尼, 万珂, 美罗华, 赫赛汀'

mongjiala = u'孟加拉吉二/哈瓦尼现在接受预定，孟加拉直邮，一万一疗程共14盒药，制药厂Incepta直接发货。代购费800元每疗程。吉二/哈瓦尼可以用于治疗丙肝，治愈率95%以上，单药即可，无需干扰素和利吧韦林，无需达卡他韦，优于索非布韦。微信：1406483897  QQ：3236568490'

headers = {'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate, utf-8',
            'Accept-Language':'en-US,en;q=0.5',
            'Connection':'keep-alive',
            'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20140924 Firefox/24.0 Iceweasel/24.8.1'}

def get_t():  # fucking crazy param
    t = time.time()
    t = int(t*1000)
    return t

def extract_cookies(firefox):
    cookies = dict()
    firefox_cookies = firefox.get_cookies()
    for firefox_cookie in firefox_cookies:
        cookies[firefox_cookie['name']] = firefox_cookie['value']
    return cookies

def parse_ups():
    file_name = 'ups'
    ret = list()
    with open(file_name, 'r') as f:
        lines = f.readlines()
        for line in lines:
            if line.startswith('#'):
                continue
            up = dict()
            line = line.strip()
            username, password = line.split(' ')
            up['username'] = username
            up['password'] = password
            ret.append(up)
    return ret

def main():
    print mongjiala

if __name__=='__main__':
    main()
