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
    laifudao_pic_url = 'http://route.showapi.com/107-33'
    laifudao_url = 'http://route.showapi.com/107-32'
    laifudao = simple_api(laifudao_url)
    r = json.loads(laifudao, encoding='utf-8')
    ret = list()
    for x in r['showapi_res_body']['list']:
        s = dict()
        s['title'] = x['title'] + '\n'
        s['content'] = x['content'].replace('<br/><br/>','\n')
        ret.append(s)
    return ret


def main():
    print 'fuck off'

if __name__=='__main__':
    main()
