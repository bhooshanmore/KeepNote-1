# KeepNote
Keep note application allows user to add notes, assign categories to them and set reminders. (Similar to google keep application)

The Objective of this KeepNote application is to cover the following :  
- Allows user to add notes
- Edit added note
- Change view from list to note view
- Assign category to each note
- Set reminders to note
- (Similar to google keep application)

##Technology Used

- Angular 5
- Spring Boot
- JPA - Hibernate
- Mysql
- MongoDb

## To run Application

- Clone the repository and cd into it.
- Open angular part in Visual studio code.
- Do "npm install"
- To run do "ng serve --o"
- Open the spring boot part in Sts or eclipse
- You will find 5 microservices run each of them as Spring Boot application
- You will requre 2 databases Mysql (RDBMS) for 1 microservices (user_auth) and mongo for remaining 4 microservices (category,reminder,notes,user).
- You need to create userDb database in Mysql before running the server.
- Now you are ready to run the application on http://localhost:4200.
