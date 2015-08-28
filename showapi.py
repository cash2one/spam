#!/usr/bin/env python2.7
#coding=utf-8

import time
import datetime
import requests
import sys
import json
import hashlib
from showapi_utils import simple_api

def laifudao():
    res_code = -1
    ret = list()
    while res_code != 0:
        laifudao_pic_url = 'http://route.showapi.com/107-33'
        laifudao_url = 'http://route.showapi.com/107-32'
        laifudao = simple_api(laifudao_url)
        r = json.loads(laifudao, encoding='utf-8')
        res_code = int(r['showapi_res_code'])
    for x in r['showapi_res_body']['list']:
        s = dict()
        s['title'] = x['title'] + '\n'
        s['content'] = x['content'].replace('<br/><br/>','\n')
        ret.append(s)
    return ret


def main():
    l = laifudao()
    for x in l:
        print x['content']

if __name__=='__main__':
    main()
