//setStatusClosed( ) will work as local storage jeita browser theke chole gele o applicaton er local storage a thekke jabe
//deleteIssue() will work as sessoin stroge jeita browser theke chole gele , application er local storage theke o chole jabe
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
  if (localStorage.getItem('issues')){ 
    
    issues = JSON.parse(localStorage.getItem('issues'));
    console.log(issues)
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues)); //server khali cilo tai ekta key pathacce amra jani server pair hishebe orthat key value kore data rakhe . aikhane key ta pathalo issues nam diye 
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}


// // ========= one way of using map=========
// // const closeIssue = id => {
//   const setStatusClosed = id => {
//   const issues = JSON.parse(localStorage.getItem('issues'));
//   console.log(issues)
//   // const currentIssue = issues.find(issue => issue.id === id); 
//   // const currentIssue = issues.map(issue => {
//     const newIssues = issues.map(issue => {
//       if(issue.id == id){
//        issue.status = 'Closed';
//      }
//      return issue;
//   } );
//   console.log(newIssues)
//   // console.log(currentIssue)
//   // currentIssue.status = 'Closed';
//   localStorage.setItem('issues', JSON.stringify(newIssues));
//   fetchIssues();
// }



//========= another way of using find ===========
// const closeIssue = id => {
  const setStatusClosed = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    console.log(issues)
    const currentIssue = issues.find(issue => +issue.id === id); 
    currentIssue.status = 'Closed';
    localStorage.setItem('issues', JSON.stringify(issues));
    // localStorage.removeItem(issues);
    fetchIssues();  //Closed holei fetchIssues er if er status condition continue korbe 

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
    if(status != 'Closed'){
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
}
