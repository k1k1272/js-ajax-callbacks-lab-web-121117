$(document).ready(function() {});

function displayError() {
  document.getElementById("errors").innerHTML =
    "I'm sorry, there's been an error. Please try again.";
}

function showCommits(ele) {
  $.get(
    `https://api.github.com/repos/${ele.dataset.owner}/${
      ele.dataset.repository
    }/commits`,
    data => {
      $("#details").html(renderCommits(data));
    }
  ).fail(displayError);
}

function renderCommits(data) {
  let result = data
    .map(
      commit => `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
    )
    .join("");
  return `<ul>${result}</ul>`;
}

function renderSearchResults(data) {
  data.items.map(
    result => `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${
      result.owner.login
    }" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>
    `
  );
}

function searchRepositories() {
  const searchTerms = $("#searchTerms").val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $("#results").html(renderSearchResults(data));
  }).fail(displayError);
}
