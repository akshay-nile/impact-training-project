FROM openjdk:11

WORKDIR /usr/hospital

EXPOSE 8084

ADD ./target/notes-0.0.1-SNAPSHOT.jar /usr/hospital/notes.jar

ENTRYPOINT ["java", "-jar", "notes.jar"]
