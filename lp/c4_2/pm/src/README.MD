# Development

## Local

    - Install NodeJS (5+)
    
    npm install
    npm run test # Unit tests...
    npm run dev # Run application server in dev mode(e.g. reload with something changed in code)
     
 
## Docker
  
   docker-machine start # On Windows to ensure docker works...
   docker-machine env | iex # On Windows (Powershell) to ensure shell knows about docker
   
   docker build -t studies-octo-adventure-pm .
   docker run -p 3000:3000 studies-octo-adventure-pm

## Amazon Beanstalk

  pip install awscli --ignore-installed six

  eb create dev --single -i t2.medium # Create environment
  eb deploy dev # Deploy to environment
  