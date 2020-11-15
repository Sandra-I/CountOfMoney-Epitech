FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD 123
ENV MYSQL_DATABASE project
ENV MYSQL_USER user
ENV MYSQL_PASSWORD user

COPY ./setup.sql /docker-entrypoint-initdb.d/
 