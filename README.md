# tpqa (Test Plan QA)

Other Test Management software.

This software is Open Source, it has been fully developed from zero and it is 100% compatible with [Testlink  1.9.17](http://testlink.org) mysql schema database.


## Run with docker
```
version: '2'

services:
  tpqa:
    image: 'dmartinlozano/tpqa'
    environment:
      - MYSQL_HOST=
      - MYSQL_USER=
      - MYSQL_PASSWORD=
      - MYSQL_DATABASE=
      - TESTLINK_URL=
      - FIRST_ADMIN_PASSWORD=
    ports:
      - 8080:8080
    volumes:
      - './tpqa:/tpqa'

```

### Environment variables

| Name | Mandatory | Example | Description |
| -| -| -|-|
| MYSQL_HOST | yes | localhost | Host of mysql server |
| MYSQL_USER | yes | root | User to connect mysql server |
| MYSQL_PASSWORD | yes | root | Password of user to connect mysql server |
| MYSQL_DATABASE | yes | testlink | Database to use with mysql |
| JWT_SECRET | yes | TPQA-MOLA-UN-MONTON | Secret string for JWT tokens. |
| TESTLINK_URL | no | http://localhost:80 | Url of previous testlink installation. **tpqa only access testlink to downlad attach files the fist time!.** The attach files aren't included in mysql database, so we download from testlink the fist time and store them in **/tpqa/attanchments** folder.|
| FIRST_ADMIN_PASSWORD | no | NeedToChangeIt | This variable is used only if mysql database is empty and allow set the password of admin the fist time|


## Run without docker
With node installed, run:
```
npm start
```
