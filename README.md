# tempus-cc-api

## Design and Technical Decisions

### Data modeling
Patient and Doctor extends from User Data model
which possibly will have common columns such as username, password, email, phone number, created_at...

We also need many to many relationship in order to store doctors' patients or vice versa.

Since email, phone number and address are sensitive data and health care companies require HIPAA compliance, it is always good idea to encrypt these columns too along with encrypting entire DB (we can use AWS KMS for symmetric data encryption). This will provide us a solid enyrpyion at rest for HIPAA compliance. I skipped the encryption for now in order to save time.


### Password hashing

I choosed bcrypt (with salt) in order to hash the password and validate the password for many safety reasons (Dictionary, Brute Force Attacks...). 
Great articles to read about bcrypt: 
https://auth0.com/blog/hashing-in-action-understanding-bcrypt/ https://codahale.com/how-to-safely-store-a-password/

We can also use rate limitter on sing-in endpoint (Ex: max 10 request per minute) to prevent and slow down attacks.

### Authentication

I choosed signed JWT authentication for stateless sessions. I also choosed to store the token on localStorage. There are pros and cons storing in LocalStorage (XSS attacks: prevented by using frontend sanitization (Angular, Vue, React already does this.)) vs Cookie with httpOnly flag enabled (CSRF attacks). There are many great articles about JWT pros and cons and its safety.  

https://dzone.com/articles/cookies-vs-tokens-the-definitive-guide

https://auth0.com/blog/stateless-auth-for-stateful-minds/


## Dev Environment Setup
install homebrew on your Mac (https://brew.sh)

```
brew install postgresql@9.6
```

### Create database
```
psql --u postgres
create database tempus;
```

### run migrations
```
node_modules/.bin/sequelize db:migrate
```

### run seeds

POST -> /users/seed

```
curl -X POST \
  http://localhost:3000/users/seed
```

### Sample Users
```
Patients:

usernames: ayged_patient, ayged_patient2, ayged_patient3, ayged_patient4, ayged_patient5, ayged_patient6
password: tempus

Doctors:

username: ayged_doctor1, ayged_doctor2
password: tempus
```
