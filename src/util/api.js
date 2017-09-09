const baseUrl = 'http://localhost:5001';

function fetchBuilder(initialConfig) {
  let finalConfig = initialConfig;
  return {
    addConfig: function (config) {
      finalConfig = Object.assign(
        finalConfig || {},
        config
      );
      return this
    },
    invoke: function (url) {
      return fetch(url, finalConfig)
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.log('this is bad', error)
        })
    }
  };
}

const basicBuilder = fetchBuilder({
  headers: {
    'Authorization': 'whatever-you-want',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const basicGetBuilder = basicBuilder.addConfig({method: 'GET'});
const basicPostBuilder = basicBuilder.addConfig({method: 'POST'});



export const fetchCategories = function () {
  return basicGetBuilder.invoke(`${baseUrl}/categories`);
};

export const fetchPosts = function (category) {
  const url = category ? `${baseUrl}/${category}/posts/` : `${baseUrl}/posts/`;
  return basicGetBuilder.invoke(url);
};

export const fetchPostComments = function (postId) {
  return basicGetBuilder.invoke(`${baseUrl}/posts/${postId}/comments`);
};

export const postVote = function (postId, up) {
  const payload = {
    option: up ? "upVote" : "downVote"
  };
  return basicPostBuilder.addConfig({body: JSON.stringify(payload)}).invoke(`${baseUrl}/posts/${postId}`);
};

