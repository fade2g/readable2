import {generateUUID} from "./util";

const baseUrl = 'http://localhost:5001';

class FetchBuilder {
  constructor(initialConfig) {
    this.config = Object.assign({}, initialConfig || {});
  }

  addConfig = function (config) {
    Object.assign(this.config, config);
    return new FetchBuilder(this.config)
  };

  invoke = function (url) {
    return fetch(url, this.config)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log('this is bad', error)
      })
  };
}

const basicFetchBuilder = new FetchBuilder({
  headers: {
    'Authorization': 'whatever-you-want',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const basicGetBuilder = basicFetchBuilder.addConfig({method: 'GET'});
const basicPostBuilder = basicFetchBuilder.addConfig({method: 'POST'});
const basicDeleteBuilder = basicFetchBuilder.addConfig({method: 'DELETE'});
const basicPutBuilder = basicFetchBuilder.addConfig({method: 'PUT'});

export const fetchCategories = function () {
  return basicGetBuilder.invoke(`${baseUrl}/categories`);
};

export const fetchPosts = function (category) {
  const url = category ? `${baseUrl}/${category}/posts/` : `${baseUrl}/posts/`;
  return basicGetBuilder.invoke(url);
};

export const fetchPost = (postId) => {
  return basicGetBuilder.invoke(`${baseUrl}/posts/${postId}`);
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

export const postCommentVote = function (commentId, up) {
  const payload = {
    option: up ? "upVote" : "downVote"
  };
  return basicPostBuilder.addConfig({body: JSON.stringify(payload)}).invoke(`${baseUrl}/comments/${commentId}`);

};

export const postNewComment = function(postId, author, body) {
  const payload = {
    id: generateUUID(),
    parentId: postId,
    timestamp: (new Date()).getTime(),
    author,
    body
  };
  return basicPostBuilder.addConfig({body: JSON.stringify(payload)}).invoke(`${baseUrl}/comments/`)
};

export const deleteComment = function(commentId) {
  return basicDeleteBuilder.invoke(`${baseUrl}/comments/${commentId}`)
};

export const putComment = function(commentId, body) {
  const payload = {
    timestamp:(new Date()).getTime(),
    body
  };
  return basicPutBuilder.addConfig({body: JSON.stringify(payload)}).invoke(`${baseUrl}/comments/${commentId}`)
};


export const postNewPost = function(title, body, author, category) {
  const payload = {
    id: generateUUID(),
    timestamp:(new Date()).getTime(),
    title,
    body,
    author,
    category
  };
  return basicPostBuilder.addConfig({body: JSON.stringify(payload)}).invoke(`${baseUrl}/posts/`)
};

export const deletePost = function(postId) {
  return basicDeleteBuilder.invoke(`${baseUrl}/posts/${postId}`)
};

export const putPost = function(postId, title, body) {
  const payload = {
    id: postId,
    timestamp:(new Date()).getTime(),
    title,
    body
  };
  return basicPutBuilder.addConfig({body: JSON.stringify(payload)}).invoke(`${baseUrl}/posts/${postId}`)
};

