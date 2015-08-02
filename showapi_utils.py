#!/usr/bin/env python2.7
#coding=utf-8

import time
import datetime
import requests
import sys
import json
import hashlib

spam_appid = '4956'
spam_secret = '85c363472a4442b7a6df33ec19e1046d'
def time_stamp():
    now_time = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    return now_time

def md5(string):
    m = hashlib.md5()
    m.update(string)
    return m.hexdigest()

def showapi_md5(data):
    s = ''
    for key in sorted(data):
        s = s + '{}{}'.format(key, data[key])
    s = s + spam_secret
    return md5(s)

def simple_api(url):
    data = {
        'showapi_appid':spam_appid,
        'showapi_timestamp':'{}'.format(time_stamp()),
        }
    data['showapi_sign'] = showapi_md5(data)
    res = requests.post(url=url, data=data, timeout=3)
    return res.text

def main():
    print 'fuck off'

if __name__=='__main__':
    main()
