# tpqa (Test Plan QA)


## Run db
`docker-compose up`

If this error is shown: `mariadb_1   | Error executing 'postInstallation': EACCES: permission denied, mkdir '/bitnami/mariadb'`, run these commands:

```
docker-compose down -v
sudo chmod +x -R ./back/data
sudo chown -R 1001:1001 ./back/data
docker-compose up
```
