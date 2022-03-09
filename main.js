document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){ //server a kicu na thakle 
    
    issues = JSON.parse(localStorage.getItem('issues'));
    console.log(issues)
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues)); //aita khali cilo tai ekta key pathacce amra jani server pair hishebe orthat key value kore data rakhe . aikhane key ta pathalo issues nam diye 
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

// const closeIssue = id => {
  const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  // const currentIssue = issues.find(issue => issue.id === id); find to 1 ta dibe jeita first pabe but filter sob gula dibe
  const currentIssue = issues.filter(issue => issue.id != id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
  // localStorage.removeItem(fetchIssues())
//  const lacalData = localStorage.setItem('issues', JSON.stringify(remainingIssues));
//  console.log(lacalData)
  
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
