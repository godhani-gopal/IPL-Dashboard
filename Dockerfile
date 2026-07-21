# Stage 1: build React frontend
FROM node:20-alpine AS frontend
WORKDIR /build/src/frontend
COPY src/frontend/package*.json ./
RUN npm ci
COPY src/frontend/ ./
# Relative API URL — works from any host, same origin as the backend
ENV REACT_APP_API_ROOT_URL=""
ENV REACT_APP_DATA_START_YEAR=2008
ENV REACT_APP_DATA_END_YEAR=2020
RUN npx react-scripts build

# Stage 2: build Spring Boot jar (frontend included in resources/public)
FROM maven:3.9-eclipse-temurin-17 AS backend
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline -q
COPY src/main ./src/main
COPY --from=frontend /build/src/frontend/build/ ./src/main/resources/public/
RUN mvn package -DskipTests -q

# Stage 3: runtime
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=backend /build/target/ipl-dashboard-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
