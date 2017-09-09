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

const baseUrl = 'http://localhost:5001';


export const fetchCategories = function () {
  return basicGet(`${baseUrl}/categories`);
};

export const fetchPosts = function (category) {
  const url = category ? `${baseUrl}/${category}/posts/` : `${baseUrl}/posts/`;
  return basicGet(url);
};

export const fetchPostCommets = function (postId) {
  return basicGet(`${baseUrl}/posts/${postId}/comments`);
};
