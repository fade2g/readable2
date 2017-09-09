function fetchConfigFactory(config) {
  const finalConfig = Object.assign(config || {},
    {
      headers: {
        'Authorization': 'whatever-you-want',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  return function (url) {
    return fetch(url, finalConfig)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log('this is bad', error)
      })
  }
}

const basicGet = fetchConfigFactory({method: 'GET'});

export const fetchCategories = function () {
  return basicGet('http://localhost:5001/categories/');
};


const basicCommand = {
  method: 'GET',
  headers: {
    'Authorization': 'whatever-you-want',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

const basicGetCommand = {
  ...basicCommand,
  method: 'GET'
};

const basicPostCommand = {
  ...basicCommand,
  method: 'POST'
};

const baseUrl = 'http://localhost:5001';

export const fetchFactory = (supplement) => {
  return fetch(baseUrl + '/' + supplement, basicGetCommand)
};

export const postFactory = (supplement, data) => {
  return fetch(baseUrl + '/' + supplement, {...basicPostCommand, body: JSON.stringify(data)})
};
