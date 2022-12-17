## Music server

it uses mongodb to store the songs

You can use **/songs** route to get songs
And can **/songs/:id** route to listen an unique song

In order to upload a song you have to make a post request to **/upload?url=youryoutubeurl** 

### Config
Create a *.env* file in the root folder an put the database url
```
DATABASE_URL=yourdatabaseurl
```

### Docker
You can use a service as mongodb atlas and simply put the **DATABASE_URL** in the .env file and that will work
But in case that you wanna wrap all the services including the database you can run the following command
```
docker-compose build && docker-compose up
```

Modify the **.env** file with
```
DATABASE_URL=mongodb://mongo:27017/yourdatabasename
```

That will install mongodb, node and up all the services