# Text Justify REST API End-Point

The application is deployed with heroku at : https://justification-restapi-endpoint.herokuapp.com/ (the page may take some time to charge)

### API End-Point

#### Token

Get a token by posting an email

##### URL :

- **POST** : https://justification-restapi-endpoint.herokuapp.com/api/token

##### Headers :

- Content-Type: application/json

##### Body:

- ```
  { "email" : "yourEmail"  }
  ```

#### Text Justifing

Get a justified text by posting a text

##### URL :

- **POST** : https://justification-restapi-endpoint.herokuapp.com/api/justify

##### Headers :

- **Content-Type :** text/plain

- **Token : ** your token

##### Body:

- ```
  Your text that need justifing. 
  ```



### To start the project locally 

```
$ git clone https://github.com/YasserHamek/Jutification_EndPoint.git
```

Install dependencies:

```
$ npm install
```

Start Express.js app at `http://localhost:5000/`:

```
$ npm start
```

