# LabStateApi

## Setup

```javascript
git clone https://github.com/fablab-ka/LabStateApi.git
cd LabStateApi && ./build.sh && ./run.sh
```

## Usage

build the docker image with ./build.sh

run the docker container with ./run.sh this will run a container listening on port 3000

## API

GET /
  returns the current state as a json object

POST /
  set the current state
  example object: { "is_open": true }

## Security

set a clientId to restrict access to the api to clients with a distinctive id.
this is possible by creating a file called clientId.data
e.g. echo "<mygreatclientidhash>" > clientId.data

## State

the state of the API will be saved in a file called data.db