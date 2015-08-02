#!/usr/bin/env python2.7
# coding: utf-8

import time
import datetime
import requests
import sys
import json
import hashlib
from showapi_utils import showapi_md5

url = 'http://route.showapi.com/22-1'
secret = 'a0d539d966974270a30ee8abea78382c'
appid = '3738'

def get_proxy_list():
        now_time = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        data = {
                'showapi_timestamp':'{}'.format(now_time),
                'showapi_appid':'{}'.format(appid),
               }
        data['showapi_sign'] = showapi_md5(data)
        text_res = requests.post(url=url, data=data)
        json_res = json.loads(text_res.text)
        proxy_list = []
        if json_res['showapi_res_code'] != 0:
            print json_res['showapi_res_error']
            return proxy_list 
        return json_res['showapi_res_body']['ipList']

def main():
    for x in get_proxy_list():
        if x['anoy'].encode('utf-8')=='高匿名':
            print x['ip'], x['port'], x['anoy']

if __name__=='__main__':
    main()
