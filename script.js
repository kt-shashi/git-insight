const form = document.querySelector("form");
let imgProfile = document.getElementById("uimage");
imgProfile.style.display = "none";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value;

  if (username) {
    console.log(`Print username ${username}`);

    const requestUrl = `https://api.github.com/users/${username}`;

    fetch(requestUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message == "Not Found") invalidUserName();
        else showApiData(data);
      })
      .catch((error) => console.log(error));
  } else {
    alert("Username cannot be empty");
  }
});

function showApiData(data) {
  document.querySelector(".result").style.visibility = "visible";
  document.querySelector("#name").style.visibility = "visible";

  imgProfile.style.display = "initial";
  document.querySelector("#uimage").src = data.avatar_url;
  if (data.name)
    document.querySelector(
      "#name"
    ).innerHTML = `Hi ${data.name}, here is the complete analysis of your Github Profile!`;
  else
    document.querySelector(
      "#name"
    ).innerHTML = `Hi ${data.login}, here is the complete analysis of your Github Profile!`;

  document.querySelector("#uname").innerHTML = `${data.login}`;
  document.querySelector(
    "#followers"
  ).innerHTML = `Followers: ${data.followers}`;

  document.querySelector(
    "#following"
  ).innerHTML = `Following: ${data.following}`;

  if (data.bio) document.querySelector("#bio").innerHTML = `${data.bio}`;
  else document.querySelector("#bio").innerHTML = "Bio: Not Mentioned";

  if (data.company)
    document.querySelector("#company").innerHTML = `Company: ${data.company}`;
  else document.querySelector("#company").innerHTML = `Company: Not Mentioned`;

  if (data.location)
    document.querySelector(
      "#location"
    ).innerHTML = `Location: ${data.location}`;
  else
    document.querySelector("#location").innerHTML = `Location: Not Mentioned`;

  document.querySelector(
    "#public-repo"
  ).innerHTML = `Public Repository: ${data.public_repos}`;

  // Other data
  const contributionUrl = `https://streak-stats.demolab.com/?user=${data.login}&theme=highcontrast`;
  document.querySelector("#contribution-image").src = contributionUrl;

  const langUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${data.login}&theme=highcontrast`;
  document.querySelector("#lang-image").src = langUrl;

  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${data.login}&count_private=true&theme=vision-friendly-dark&show_icons=true`;
  document.querySelector("#status-image").src = statsUrl;

  const topLangUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${data.login}&layout=compact&theme=vision-friendly-dark`;
  document.querySelector("#top-lang-image").src = topLangUrl;

  const graphUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${data.login}&bg_color=1a1b27&color=aa82d9&line=628edb&point=64bfaf&area=true&hide_border=false`;
  document.querySelector("#graph-image").src = graphUrl;
}

function invalidUserName() {
  alert("Unable to find a user with that name");
  document.querySelector(".result").style.visibility = "hidden";
  document.querySelector("#name").style.visibility = "hidden";
}
