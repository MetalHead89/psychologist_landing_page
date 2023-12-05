run:
	docker run -d -p 3000:3000 --env-file ./.env --rm --name pdychology-app psychology-img
stop:
	docker stop pdychology-app
