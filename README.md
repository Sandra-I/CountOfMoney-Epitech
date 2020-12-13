# CountOfMoney_2020_49

## Getting started

First, clone this repo:
```
git clone https://github.com/EpitechMscPro2020/CountOfMoney_2020_49.git
```
Then, create an account on CryptoCompare and generate an API key, you will need it later.
 
Next, copy the .env file into .env.local and edit its content

And finally:
```
docker-compose up --build -d
```
## How to use

First, you have to generate an admin account. To do so, edit the DEFAULT_ADMIN_* fields before launching the project and then, in your browser, go to http(s)://<domain_name>/setup (replace <domain_name> with the domain from where the project is launched).

### You can then:
- Connect as an Administrator
 -> Add cryptocurrencies in the app database
 -> Delete some
 
- Create an user account
 -> Register
 -> Sign in
 -> And enjoy your navigation !

## How to stop
```
docker-compose down
```
