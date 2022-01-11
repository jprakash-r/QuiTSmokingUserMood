# Quit Smoking Mood Tracker App

This app is designed to track User's mood on daily basis and represnt stats .

## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

To fulfill this , there are few functionality are  designed.

Mongo DB :

  1. create a new database .Name it as Test for this sample application to store data.
  2. Create user (refer api_run_instructions fr comple API details)
  3. Create mood for specific user (refer api_run_instructions fr comple API details)
  4. Fetch User by User id (refer api_run_instructions fr comple API details)
  5. fetch mood by User id (refer api_run_instructions fr comple API details)

To design a solution , mentioned thoughts below .

Create a Document named User . Which has user id ,name and age .
Create a Document named Mood . Which has user id ,mood .

User and mood are in one to many relationship , i.e, one user can register multiple moods .But one user can have one mood a day .

Why choice of Mongo over Oracle : document based DB is easy to insert data into and fetch data from and can store large dataset.

 Problem statement :
 
 How to find , User is in happy mood for the month of June?

 Solutiom:

 To quantify this , an API is designed to fetch details for user in a manner like :
   1. prvide a User's All moods
   2. provide a User's specific Mood 
   3. Provide a User's specific Mood within the timeline

So the APi became flexible to accomodate any other filter criteria in future with less code changes .


### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your local machine .Best tool to use is git bash .

- #### Node installation on Ubuntu

  You can install nodejs and npm easily, just run the following commands.

      $ homebrew install nodejs
      $ homebrew install npm


If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`

    $ npm install npm -g


## Install

    $ git clone https://github.com/jprakash-r/QuiTSmokingUserMood
    $ cd QuiTSmokingUserMood
    $ git checkout --track master
    $ npm install

## Configure app

Ideally no configuration is necessary if node is already present in system

## Running the project

    $ node index.js

## Simple build for production

    $ Start docker deskop
    $ docker version
    $ docker buid -t <image_name>
    $ docker images
    $ docker run -p 8092:8092 <image_name>
    $ docker logs <container_id> 

If going through docker compose :

    $ docker-compose up

Database details should be specified in .env file (or create a different .envprod and refer it. Its a sample code so havent provided here)

For build in prod , need to create docker image and runit over Kube cluster .


  