FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/candy-0.0.1-SNAPSHOT.jar /app/candy-0.0.1-SNAPSHOT.jar

EXPOSE 3000

CMD ["java", "-jar", "/app/candy-0.0.1-SNAPSHOT.jar"]