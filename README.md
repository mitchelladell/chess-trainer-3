Run the command for running the database:

docker run -p 1234:5432 --name some-postgres -e POSTGRES_PASSWORD=ombarkab1 -e POSTGRES_USER=mitchelladel -e POSTGRES_DB=chessusity -d postgres
