FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install

# Stage 2: Create a minimal runtime image
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Set any environment variables if needed
# ENV VARIABLE_NAME=value

# Expose the port if your application uses a specific port
# EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]