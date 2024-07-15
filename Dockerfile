FROM openjdk:11-jre-slim

WORKDIR /app

COPY target/ipl-dashboard-0.0.1-SNAPSHOT.jar /app/ipl-dashboard.jar

EXPOSE 8081

ENTRYPOINT [ "java","-jar","/app/ipl-dashboard.jar" ]

