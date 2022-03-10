const getInputValue = (inputId) => document.getElementById(inputId).value;

// submit form value
const submitForm = (e) => {
  e.preventDefault();
  const description = getInputValue("issueDescription");
  const severity = getInputValue("severity");
  const assignTo = getInputValue("issueAssignTo");
  const status = "open";
  const id = Math.floor(Math.random() * 100000000).toString();

  if (!description || !assignTo) {
    alert("Input Field cann't be balnk");
    return;
  }
  const issue = { id, description, severity, assignTo, status };
  let issues = [];
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchLoad();
  // clear input field
  document.getElementById("form-submit").reset();
};
// close button
const closeButton = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.find((issue) => issue.id === id);
  currentIssue.status = "close";
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchLoad();
};
// delete button function
const deleteButton = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const remaining = issues.filter((issue) => issue.id !== id);
  localStorage.setItem("issues", JSON.stringify(remaining));
  fetchLoad();
};

// main function load
const fetchLoad = () => {
  const getItem = JSON.parse(localStorage.getItem("issues"));
  const issueList = document.getElementById("issue-list");
  issueList.innerHTML = "";
  getItem.forEach((issue) => {
    const { id, description, severity, assignTo, status } = issue;
    const div = document.createElement("div");
    div.classList.add("col-lg-12");
    div.innerHTML = `
     <div class="p-3 mb-3 bg-color1">
              <p>Issue ID : <span>${id}</span></p>
              <p class="bg-primary d-inline rounded text-white px-2 py-1">
                ${status}
              </p>
              <h5 class="mt-2">${description}</h5>
              <p>
                <span><i class="fa-solid fa-clock"></i></span> <span>${severity}</span>
              </p>
              <h5 class="mb-3">
                <span><i class="fa-solid fa-user"></i></span>
                <span>${assignTo}</span>
              </h5>
              <div class="button-group">
                <button
                  onclick="closeButton('${id}')"
                  class="btn btn-warning text-white"
                >
                  Close
                </button>
                <button onclick="deleteButton('${id}')" class="btn btn-danger mx-2">
                  Delete
                </button>
              </div>
            </div>
      `;
    issueList.appendChild(div);
  });
};
document.getElementById("form-submit").addEventListener("submit", submitForm);
