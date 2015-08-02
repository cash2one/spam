#!/usr/bin/env python2.7
#coding=utf-8

from selenium import webdriver
import time

def get_cookie(url):
    driver = webdriver.Firefox()
    driver.delete_all_cookies()
    driver.get(url)
    
    # 获得cookie信息
    firefox_cookies= driver.get_cookies()
    
    driver.quit()

    # return value: cookies
    cookies = dict()
    for firefox_cookie in firefox_cookies:
        cookies[firefox_cookie['name']] = firefox_cookie['value']
    return cookies
