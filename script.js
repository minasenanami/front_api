const baseURL = "https://mysterious-fortress-23550.herokuapp.com";
const postList = document.getElementById("post-list");

const fetchPosts = async () => {
  const url = `${baseURL}/posts`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }

  const posts = await response.json();
  return posts;
};

const addPost = (post) => {
  const content = `
  <div id="posts-${post.id}">
    <p>タイトル: ${post.title}</p>
    <p>内容: ${post.content}</p>
  </div>
  `;
  postList.insertAdjacentHTML("beforeend", content);
};

const displayPosts = async () => {
  try {
    const posts = await fetchPosts();
    posts.forEach((post) => addPost(post));
  } catch (e) {
    alert(e);
  }
};

displayPosts();

const postButton = document.getElementById("post-button");
const titleElement = document.getElementById("post-title");
const contentElement = document.getElementById("post-content");

const registerPost = async () => {
  const url = `${baseURL}/posts`;
  const postParams = {
    post: {
      title: titleElement.value,
      content: contentElement.value,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postParams),
  });

  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }

  const post = await response.json();
  return post;
};

const postForm = async () => {
  try {
    const post = await registerPost();
    addPost(post);
    titleElement.value = contentElement.value = "";
  } catch (e) {
    alert(e);
  }
};

postButton.addEventListener("click", postForm);
