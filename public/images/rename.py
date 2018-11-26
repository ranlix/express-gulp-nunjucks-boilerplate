#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import sys

def renameFiles(path='./2017'):
    # for dirpath, dirnames, filenames in os.listdir(path):
    for file in os.listdir(path):
        print file
        print file.replace(" ", "-")
        os.rename(path + '/' + file, path + '/' + file.replace(" ", "--"))

renameFiles()