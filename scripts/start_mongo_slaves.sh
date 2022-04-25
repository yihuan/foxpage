#!/bin/bash

mongod --bind_ip 127.0.0.1 --port 27018 --dbpath /usr/local/var/mongodb1 --replSet myset
# mongod --bind_ip 127.0.0.1 --port 27019 --dbpath /usr/local/var/mongodb2 --replSet myset
