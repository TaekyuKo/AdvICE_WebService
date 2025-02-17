FROM eclipse-temurin:17-jre-alpine
RUN apk update && apk add --no-cache redis
WORKDIR /backend
COPY build/libs/*.jar app.jar
RUN mkdir -p backend
COPY .env backend/.env
EXPOSE 8080
ENTRYPOINT ["/bin/sh", "-c", "redis-server --daemonize yes && java -jar app.jar"]
