const repoOwner = "wlalsplus100";
const repoName = "wlalsplus100.github.io";
const path = "_posts";

const getFileName = async () => {
  return await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`
  )
    .then((response) => response.json())
    .then((data) => {
      const markdownFiles = data
        .filter((file) => file.name.endsWith(".md"))
        .map((file) => file.name);
      return markdownFiles;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getMarkdown = async (fileName) => {
  return await fetch(`/_posts/${fileName}`)
    .then((response) => response.text())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const markDownContainer = document.querySelector("#markdown-content");

getFileName().then((res) => {
  getMarkdown(res).then((md) => {
    console.log(md);
    const htmlContent = marked.parse(md);
    markDownContainer.innerHTML = htmlContent;
  });
});
