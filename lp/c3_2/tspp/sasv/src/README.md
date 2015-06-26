# Development

## Tools

  choco install node
  choco install mongodb
  choco install atom

  LiveReload - https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
  Robomongo

# Dev

## Старт проекту

  npm install
  gulp build
  start npm start

  http://localhost:3000/


## На час розробки

   start gulp dev
   start npm start

   http://localhost:3000/



# Install

## Mongo

Install MongoDb

  md c:\data\log
  md c:\data\db
  echo logpath=c:\data\log\mongod.log> "C:\data\mongod.cfg"
  echo dbpath=c:\data\db>> "C:\data\mongod.cfg"

  sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\3.0\bin\mongod.exe\" --service --config=\"C:\data\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"

### Uninstall Mongo

  sc.exe delete MongoDB

## Dev Install

Install nodejs

## IIS Server Install

1. Install nodejs
2. Install IIS (Programs and Features)
3. Install IISNODE (https://github.com/tjanczuk/iisnode - x64)
4. Ensure Feature Delegation is enabled for Handlers
5. Add new site, port 3000, path c:\havas\master-server\

## Amazon Install

  'pip install awsebcli
  'eb init
  'eb create prod

  eb use prod
  eb setenv DB=mongodb://sasv:sasv@ds051841.mongolab.com:51841/sasv
  eb deploy
