
# Task Management 

It is a secured full stack task management system that allows the admin/manager to distribute tasks among employees, track the status of each task and write comments for each task specific to a particular employee.

## Features
### Security

- This project has Authentication and autherization system handled by Spring Security
- Employee signup and login : User get JWT token after successful login which will be needed later in each request
- Access to secured end-points depends on the user's role (EMPLOYEE , ADMIN) and verification of the JWT token with this request.

### Admin Controll
- Admin can create and distribute tasks to specific employees,update, delete , get all tasks , get task by Id or title
- Admin can create comments for certain task and get all comments of one task
- Admin can get all employees , add employee
- Search employees by firstName or lastName

### Employee Services
- Each employee has own dashboard to view all his/her tasks , view each task with it's comments between employee and admin , update 
  task

### Prerequisites
- Java 17
- Spring Boot 3.3.5
- Maven
- Angular 18.2.11 , boostrap 5.3.3 , Angular UI library(Ng-Zorro 18)
- Postman
- IDE (Eclips)


