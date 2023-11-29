# HabitTrackerFrontend
This Angular project is a habit tracking application designed to manage daily habits with user authentication (login and signup) and habit management features. The application allows users to add, edit, and delete habits, and provides a comprehensive monthly view of habits to track the user's progress over time.



### Installation Prerequisites:

Node.js (Version v14.5 or higher)
Angular CLI (Version 14 or higher)

### Getting Started
git clone https://github.com/guru-raghavendra/habbit-tracker-frontend <br>
cd habbit-tracker-frontend <br>
npm install

### Running the Application
ng serve

### Running Tests
ng test


### Project Structure
<b>src/app </b>: Contains the main application components, services, and models. <br>
<b>src/environments:</b> Environment configuration files. <br>
<b>Login Module:</b> Complete the login method to authenticate users.  <br>
<ul>
  <li>User should be able to sign up by providing user name and passwrod, on successful creation, should redirect to login</li>
  <li>User should be able to login, with correct credentials, after successful login, should be able to save the token from the response in the cookies and redirect to dashboard</li>
</ul>
<b>Dashboard Module:</b> For tracking habits <br>
it has two parts 
<ol>
  <li>
    monthly view
    <ul>
      <li> show last 31 days data in the calender format, from the response of <i> dashboard/get-todays-data/</i> api, and fill the empty boxes with NA</li>
    </ul>
  </li>
  <li>
    Daily view
    <ul>
      <li> show the daily list of habit, from the response of <i> dashboard/get-todays-data/</i> api, if the habbit is not complete add not-completed class on click mark it as complet and bulk update status on save</li>
       <li>on click on edit, should the hibbits in input text, beside each show save and delete button</li>
    </ul>
  </li>
</ol>

<b>Error Handling:</b> if 401 error status redirect to login <br>
<b>Token Handling:</b> add token if token present in cookies <br>
