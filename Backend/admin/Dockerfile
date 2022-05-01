FROM openjdk:11

WORKDIR /usr/hospital

EXPOSE 8081

ADD ./target/admin-0.0.1-SNAPSHOT.jar /usr/hospital/admin.jar

ENTRYPOINT ["java", "-jar", "admin.jar"]
