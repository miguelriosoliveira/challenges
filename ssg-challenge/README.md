## SSG Full-stack Take Home Exercise

### Task

Create a simple web-app to lookup info for a text message.

The application should take a **phone number** and **message string**, and then send that data to a backend for analysis.

It should then display the following info:

- The matched `Country`, `Region`, `Operator`, and `Prefix`
- Message body with any urls highlighted and clickable  
   ​
  A sample dataset of country and operators prefixes is [here](#file-data-json) for Canada, all numbers start with `1`
  ​
  When matching a number to the prefix the application should select the record with the longest matching prefix from the supplied sample data set, for example
  ​
  Given a phone number `14373293504` and a set of prefixes
  ​
  ```
  {"prefix": 1, "operator": "", "country_code": 1, "region": "", "country": "USA"},  
  {"prefix": 1, "operator": "", "country_code": 1, "region": "", "country": "Canada"},  
  {"prefix": 143, "operator": "", "country_code": 1, "region": "", "country": "Canada"},
  {"prefix": 1437, "operator": "", "country_code": 1, "region": "Ontario", "country": "Canada"},
  {"prefix": 1437329, "operator": "Lucky Mobile", "country_code": 1, "region": "Ontario", "country": "Canada"}
  ```
  ​
  The application should select the record with prefix `1437329`

### User story

- As a user I can **input a phone number into the app**
- I then **see the country, region, operator and prefix** of the phone number
- If the message contained a URL, I can **click a link** in the message to open the site

### Technical Requirements

- [React](https://facebook.github.io/react/) is preferred but not mandatory
- We also like Typescript 
- Use any libraries
- The backend should provide a single RESTful endpoint or GraphQL edge to analyse messages
- Please write any tests you deem appropriate
- Write a docker-compose.yml to run the application (we'll run `docker-compose up`)


### Notes

We don't need you provide a totally polished submission, your time is valuable! if something isn't perfect or you need to reduce the scope  for any reason you're welcome to just talk to us about how you would improve your solution given more time.

### Submission

Please commit your application to a private github repository and share with user `viperfx` and `thongly`