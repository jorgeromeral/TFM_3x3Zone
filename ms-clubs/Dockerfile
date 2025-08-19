FROM maven:3.9.6-eclipse-temurin-21 AS build
COPY . .
RUN mvn clean package -DskipTests #Skip tests because environmental variables are not being taken

FROM openjdk:21
EXPOSE 8083
COPY --from=build /target/ms_clubs-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]