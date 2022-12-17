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