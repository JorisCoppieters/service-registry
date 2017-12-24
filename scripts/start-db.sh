#!/bin/bash

cd "`dirname $0`/../"
mkdir -p ./db
mkdir -p ./logs
mongod --dbpath=./db --port 27017 2>&1 >> ./logs/db.txt &
