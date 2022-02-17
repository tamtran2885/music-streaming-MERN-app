![Logo](https://assets.website-files.com/5d7ac47d34aefe1ecf290ce6/5d7ac68da9740c393a589ee7_logo_org_1.png)

# MERN MUSIC APP PLAYER

This project is originated from an idea of developing a music streaming platform like Spotify/SoundCloud. The alumni will develop a silent-server application using technologies such as NodeJS, Express, MongoDB, Firebase and Cloudinary for back-end implementation, and ReactJS and Redux for front-end.

## Authors

- [@tamtran2885](https://github.com/tamtran2885)
- [@jaimealcalde](https://github.com/jaimealcalde/)
- [@E-Hidalgo](https://github.com/E-Hidalgo/)
- [@SalvaBandicoot](https://github.com/SalvaBandicoot)

![App Screenshot](https://res.cloudinary.com/dj30eyyuy/image/upload/v1645037035/tlnen8isfzauimqhgi47.png)

## Tech Stack

FRONTEND : React.js, Redux, SASS, Firebase, Axios

BACKEND : Node.js(express.js), Firebase-admin, MongoDB, Cloudinary, CORS, Mongoose, Morgan, Nodemon, Multer, Path, Babel

## Documentation

[React.js]( https://nodejs.org/en/docs/),
[Node.js]( https://nodejs.org/en/docs/),
[Node.js]( https://nodejs.org/en/docs/),
[Node.js]( https://nodejs.org/en/docs/),
[Node.js]( https://nodejs.org/en/docs/),
[Node.js]( https://nodejs.org/en/docs/),
[Firebase-Admin](https://lodash.com/),
[MongoDB](https://docs.mongodb.com/).
[Cloudinary](https://cloudinary.com/documentation/node_integration).
[CORS](https://github.com/expressjs/cors#readme).
[Mongoose](https://mongoosejs.com/).
[Morgan](https://github.com/expressjs/morgan#readme).
[Nodemon](https://nodemon.io/).
[Multer](https://github.com/expressjs/multer#readme).
[Path](https://nodejs.org/docs/latest/api/path.html).
[Babel](https://babel.dev/docs/en/babel-core).

## API Reference

### Users


#### Get all users
```http
  GET /api/user
```


#### Create New User
```http
  POST /api/user
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`firstName`| `string` | **Required**. First name of user  |
|`lastName` | `string` | Last name of user                 |
|`birthday` | `date`   | Birthday of user                  |
| `country` | `string` | Country of user                   |
| `profile` | `string` | `URL` of user photo in cloudinary |
| `email`   | `string` | **Required**. Email of user       |
| `password`| `string` | **Required**. Password of user    |
|`cloudinaryId`| `string` | Cloudinary Id of user photo    |
|`firebaseUser`| `string` | Firebase User ID           |


#### Create User ???
```http
  POST /api/user
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`firstName`| `string` | **Required**. First name of user  |
| `email`   | `string` | **Required**. Email of user       |
| `password`| `string` | **Required**. Password of user    |
|`firebaseUser`| `string` | Firebase User ID           |


#### CREATE USER WITH GOOGLE ACCOUNT
```http
  POST /api/user/google
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item of fetch |


#### GET USER BY ID
```http
  GET /api/user/:userId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `string` | **Required**. Firebase User ID |


#### UPDATE USER BY ID
```http
  PUT /api/user/:userId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`firstName`| `string` | **Required**. First name of user  |
|`lastName` | `string` | Last name of user                 |
|`birthday` | `date`   | Birthday of user                  |
| `country` | `string` | Country of user                   |
| `profile` | `string` | `URL` of user photo in cloudinary |
|`cloudinaryId`| `string` | Cloudinary Id of photo user    |
|`userId   `| `string` | Firebase User ID               |


#### DELETE USER BY ID
```http
  DELETE /api/user/:userId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`userId   `| `string` | Firebase User ID               |


#### FOLLOW USER USING FIREBASE UID
```http
  PUT /api/user/follow/:userId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`userId   `| `string` | Firebase User ID              |
|`req.query.fbUserToFollow `|`string`| Firebase User ID |


#### UNFOLLOW USER BY FIREBASE USER
```http
  PUT /api/user/unfollow/:userId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`userId   `| `string` | Firebase User ID               |
|`req.query.fbUserToUnfollow `|`string`|Firebase User ID|


### Tracks


#### Get Track
```http
  GET /api/tracks
```


#### Get Track by Id
```http
  GET /api/tracks/:trackId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `trackId` | `string` | **Required**. Track ID    |


#### Get Track by search
```http
  GET /api/tracks/search
```
| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `req.query.searchQuery`|`string`|**Required**. Search String|


#### Create track 
```http
  POST /api/tracks
```
| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `title`   | `string` | **Required**. Title of track           |
| `artist`  | `string` | Artist of track                        |
| `album`   | `string` | Album of track                         |
| `genre`   | `string` | Genre of track                         |
| `duration`| `Number` | Duration of track                      |
|`firebaseUser`|`string`|**Required**. Track creator (Firebase User ID) |
| `urlTrack`| `string` |`URL` of Claudinary track               |
|`cloudinaryId`|`string`|Claudinary id of track                 |


#### Upload thumnnail to Track
```http
  PUT /api/tracks/uploadThumbnail/:trackId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `urlTrack`| `string` |`URL` of Cloudinary track          |
|`cloudinaryId`|`string`|Cloudinary Id of track            |


#### Update Track
```http
  PUT /api/tracks/edit/:trackId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `trackId`   | `string` | **Required**. Track Id       |
| `title`   | `string` | **Required**. Track title      |
| `artist`  | `string` | Artist of track                   |
| `album`   | `string` | Album of track                    |
| `genre`   | `string` | Genre of track                    |
| `duration`| `Number` | Track duration                 |


#### Delete Track by Track Id
```http
  DELETE /api/tracks:trackId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `trackId`   | `string` | **Required**. Track Id      |


#### Get Tracks Created By Each User
```http
  Get /api/tracks/mine
```
| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
|`req.query.firebaseUser`|`string`|**Required**. Firebase User ID|


#### Add "fav" to track
```http
  PUT /api/tracks/like/:trackId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`trackId`|`string`|**Required**. Track Id                 |


#### Remove "fav" from track
```http
  PUT /api/tracks/unlike/:trackId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`req.query.firebaseUser`|`string`|**Required**. Track Id  |


#### Add Track to playlist
```http
  Get /api/tracks/addToPlaylist/:trackId
```
| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
|`trackId`|`string`|**Required**. Track Id                        |
|`req.query.playlistId`|`string`|**Required**. Playlist Id|



#### Remove Track to playlist
```http
  Get /api/tracks/deleteFromPlaylist/:trackId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`trackId`|`string`|**Required**. Track Id                 |
|`req.query.playlistId`|`string`|**Required**. Playlist Id |


#### Update reproduction counter
```http
  PUT /api/tracks/reproducing/:trackId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `trackId` | `string` | **Required**. Track Id          |


#### Get Track liked by user
```http
  GET /api/tracks/likedByUser/:userId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`userId   `|`string`  |**Required**. Firebase User Id  |


#### Add track to album
```http
  PUT /api/tracks/addToAlbum/:trackId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `trackId` | `string` | **Required**. Track id            |
|`req.query.albumId`|`string`| **Required**. Album Id      |


#### Add photo to track
```http
  PUT /api/tracks/addPhotoToTrack/:trackId
```
| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `trackId` | `string` | **Required**. Track id                  |
|`cloudinaryId`|`string`|**Required**. Cloudinary Id of Photo    |
|`photoTrack`|`string`|**Required**. `URL` of photo to Cloudinary|


### Album

#### Get all albums
```http
  GET /api/albums
```


#### Get album by id
```http
  GET /api/albums/:albumId
```
| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `albumId` | `string` | **Required**. Album Id         |


#### Create new album
```http
  POST api/albums/
```
| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `title`   | `string` | **Required**. Title of album             |
|`year`     | `Date`   |  Year of album                           |
|`thumbnail`| `string` |**Required**. `URL` of photo to Cloudinary|
|`cloudinaryId`|`string`|**Required**. Cloudinary Id of photo     |
|`totalTracks`|`Number`|  Number of tracks in album               |
|`firebaseUser`|`string`|**Required**. Firebase Id of album's creator  |


#### Update album by id
```http
  PUT api/albums/
```
| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `title`   | `string` |  Title of album                          |
|`year`     | `Date`   | Year of album                            |
|`thumbnail`| `string` | `URL` of photo to Cloudinary             |
|`cloudinaryId`|`string`|**Required**. Cloudinary Id of photo     |
|`totalTracks`|`Number`|**Required**. Number of tracks in album   |


#### Delete album by id
```http
  Delete api/albums/:albumId
```
| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `albumId` | `string` | **Required**. Album Id           |


### Playlist


#### Get all playlist
```http
  GET api/playlists
```


#### Get playlist by id
```http
  GET api/playlists/:playlistId
```
| Parameter  | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
|`playlistId`| `string` | **Required**. Playlist Id    |


#### Create playlist
```http
  POST api/playlists
```
| Parameter  | Type     | Description                                    |
| :--------- | :------- | :--------------------------------------------- |
|`title`     | `string` | **Required**. Title of playlist                |
|`collaborative`|`Boolean`| Collaborative of playlist                    |
|`description`|`string` | Description of playlist                        |
|`publicAccessible`|`Boolean`| Accessibility of playlist                 |
|`thumbnail` | `string` | **Required**. `URL` photo of playlist          |
|`cloudinaryId`|`string`|**Required**. Cloudinary id of playlist photo|
|`firebaseUser`| `string` | **Required**. Firebase Id of playlist's creator   |


#### Update playlist by Id
```http
  PUT api/playlists/:playlistId
```
| Parameter  | Type     | Description                                    |
| :--------- | :------- | :--------------------------------------------- |
|`playlistId`| `string` | **Required**. Id of playlist                   |
|`title`     | `string` | **Required**. Title of playlist                |
|`collaborative`|`Boolean`| Collaborative of playlist                    |
|`description`|`string` | Description of playlist                        |
|`publicAccessible`|`Boolean`| Accessibility of playlist                 |
|`thumbnail` | `string` | **Required**. `URL` photo of playlist          |
|`cloudinaryId`|`string`|**Required**. Cloudinary Id of playlist photo|


#### Delete playlist by id
```http
  DELETE api/playlists/:playlistId
```
| Parameter  | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
|`playlistId`| `string` | **Required**. Playlist Id    |


#### Follow playlist 
```http
  PUT api/playlists/follow/:playlistId
```
| Parameter  | Type     | Description                                    |
| :--------- | :------- | :--------------------------------------------- |
|`playlistId`| `string` | **Required**. Playlist Id                   |
|`req.query.firebaseUser`| `string` | **Required**. Firebase User id  |


#### Unfollow playlist 
```http
  PUT api/playlists/unfollow/:playlistId
```
| Parameter  | Type     | Description                                    |
| :--------- | :------- | :--------------------------------------------- |
|`playlistId`| `string` | **Required**. Playlist Id                   |
|`req.query.firebaseUser`| `string` | **Required**. Firebase User id  |



#### Get playlist's details
```http
  GET api/playlists/details/:playlistId
```
| Parameter  | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
|`playlistId`| `string` | **Required**. Playlist Id    |


#### Get info of playlist's creator 
```http
  GET api/playlists/detailsUser/:playlistId
```
| Parameter  | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
|`playlistId`| `string` | **Required**. Playlist Id    |


#### Get all playlists created by certain user (using Firenase User Id)
```http
  GET api/playlists/:playlistId
```
| Parameter  | Type     | Description                                    |
| :--------- | :------- | :--------------------------------------------- |
|`playlistId`| `string` | **Required**. Id of playlist                   |
|`req.query.firebaseUser`| `string` | **Required**. Firebase User id  |


#### Get user's following playlist
```http
  GET api/playlists/getFollowing/:userId
```
| Parameter  | Type     | Description                                    |
| :--------- | :------- | :--------------------------------------------- |
|`playlistId`| `string` | **Required**. Playlist Id                   |
|`userIdr`   | `string` | **Required**. Firebase User id             |

  
## Deployment

To deploy this project run

```bash
  npm run deploy
```

  
## Demo

Insert gif or link to demo

  
## Installation

Install of Webpack with npm


### 1. To start npm and create package.json
```bash
  npm init -y 
```
### 2. To install webpack, webpack-cli and webpack-dev-server as dev dependencies

```bash
  npm i -D Webpack Webpack-cli webpack-dev-server
```

### 3. Then go to package.json and add in "scripts":
 **"start": "webpack serve" --> to use webpack-dev-server as start command**
  * Now we create webpack.config.js to start configuring the settings.

  ```
const webpack = require("webpack); --> // to include webpack

// Settings for module exporting //

module.exports = {   
  mode: "development" --> // We set the mode to development
};
```


  * Here we have to change some settings for webpack-dev-server to show the changes live in browser

  ```
  devServer: {
    historyApiFallback: true,
    port: 4000,
    open: true,
    compress: true,
    hot: true,
  },
  ```


**"build": "webpack" --> to use webpack as the bundle builder.**

### 4. Now we create our Javascript File @ src/index.js

### 5. Once created, run these two commands:

```bash
  npm run build --> // to create the [name].bundle.js
```
```bash
  npm run start --> // to start live webpack dev server
```

### 6. The next step is "Webpacking" the HTML, so we install HtmlWebpackPlugin

```bash
  npm i -D html-webpack-plugin
```
  And then set some config for this one.
```
const HtmlWebpackPlugin = require("html-webpack-plugin"); // to the top!

// INSIDE module.exports //
    plugins: [
    new HtmlWebpackPlugin({
      title: "Weeeebpack",
      template: "index.html",
      filename: "index.html",
    }),
```

__Just in case we want to change entry and output points and if we want to use the "path" taken from path module in npm__

Add path to our const require and then we can change __entry__ and __output__ points as follows:
```
const path = require("path");

// INSIDE module.exports //
 entry: {
    main: path.resolve(__dirname, "./src/js/main.js"),
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
```
