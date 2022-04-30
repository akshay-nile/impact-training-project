FROM openjdk:11

WORKDIR /usr/hospital

EXPOSE 8088

ADD ./target/authentication-0.0.1-SNAPSHOT.jar /usr/hospital/authentication.jar

ENTRYPOINT ["java", "-jar", "authentication.jar"]
