#!/bin/bash

mongod --bind_ip 127.0.0.1 --port 27017 --dbpath /usr/local/var/mongodb --replSet myset
