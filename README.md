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
      <li>on click on new, a popup to add new habit</li>
    </ul>
  </li>
</ol>

<b>Error Handling:</b> if 401 error status redirect to login <br>
<b>Token Handling:</b> add token if token present in cookies <br>


### API Contacts
<ul>
  <li> 
    <b>Sign Up: </b> https://habbit-tracker-ten.vercel.app/accounts/signup/ <br>
     &emsp; Type : POST  <br>
    &emsp; Request: {
                    "username": "user",
                    "password": "user"
                } <br>
     &emsp; Response {
                        "id": 7,
                        "username": "user"
                    }<br>
  </li>
  <li> 
    <b>Login: </b> https://habbit-tracker-ten.vercel.app/accounts/login/ <br>
    &emsp; Type : POST  <br>
    &emsp; Request: {
                    "username": "user",
                    "password": "user"
                } <br>
     &emsp; Response {
                    "token": "token stinring"
                }<br>
  </li>
   <br> <br>
  For all the dashboard api's add authorisation header as "Token {token strting}" 
   <br>
  <li> 
    <b>Get Data: </b> https://habbit-tracker-ten.vercel.app/dashboard/get-todays-data/ <br>
    &emsp; Type : GET  <br>
    &emsp; Request: <br>
    &emsp; Response {
    "todays_habits": [
        {
            "habit": 13,
            "habit_name": "gym",
            "completed": false
        }
    ],
    <br>
    "month_stats": [
        {
            "date": "2023-10-30",
            "total_habits": 0,
            "completed_habits": 0
        }
    ]
    }<br>
  </li>
  <li> 
    <b>Upate habit status: </b> https://habbit-tracker-ten.vercel.app/dashboard/save-habit-statuses/ <br>
    &emsp; Type : POST  <br>
    &emsp; Request: [
            {
                "habit_id" : 1,
                "status" : true 
            } ] <br>
    &emsp; Response {
    "message": "Habit statuses and stats updated successfully"
    }<br>
  </li>

  <li> 
    <b>Edit habit : </b> https://habbit-tracker-ten.vercel.app/dashboard/edit-habit/{habit-id}/ <br>
    &emsp; Type : PUT  <br>
    &emsp; Request: {
            "name":"workout"
        } <br>
    &emsp; Response {
            "message": "Success"
        }<br>
  </li>

  <li> 
    <b>Edit habit : </b> https://habbit-tracker-ten.vercel.app/dashboard/dashboard/delete-habit/{habit-id}/ <br>
    &emsp; Type : DELETE  <br>
    &emsp; Request:  <br>
    &emsp; Response ("month_stats": [
        {
            "date": "2023-10-30",
            "total_habits": 0,
            "completed_habits": 0
        }
    ]
    }<br>
  </li>

   <li> 
    <b>Create new habit : </b> https://habbit-tracker-ten.vercel.app/dashboard/create-new-habit/ <br>
    &emsp; Type : POST  <br>
    &emsp; Request: {
    "name":"play guitar3"
} <br>
    &emsp; Response ("month_stats": [
        {
            "date": "2023-10-30",
            "total_habits": 0,
            "completed_habits": 0
        }
    ]
    }<br>
  </li>
</ul>
