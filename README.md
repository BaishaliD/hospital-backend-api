# hospital-backend-api

A backend API for a hospital to store  COVID-19 reports of patients.

There can be 2 types of Users:
- Doctors
- Patients


Doctors can log in.

Each time a patient visits, the doctor will follow 2 steps :
 Register the patient in the app (using phone number)
- After the checkup, create a Report
- Patient Report will have the following fields
- The report can have any one of the following status:
  * Negative
  * Travelled-Quarantine
  * Symptoms-Quarantine
  * Positive - Admit

## API endpoints :

base route: 

localhost/8000/api

- /doctors/register : register with username and password
- /doctors/login : log in registered doctor and return the JWT to be used
- /patients/register : register a patient using phone number
- /patients/:id/create_report : create report of a patient with phone number as id
- /patients/:id/all_reports : List all the reports of a patient from oldest to latest
- /reports/:status : List all the reports of all the patients filtered by a specific
status

