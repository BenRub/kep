FROM mysql:5.7.22

ENV MYSQL_ROOT_PASSWORD=mypassword
ENV MYSQL_DATABASE=mydb
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword

COPY ./sql-scripts/ /docker-entrypoint-initdb.d/


