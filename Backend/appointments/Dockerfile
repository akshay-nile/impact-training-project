FROM openjdk:11

WORKDIR /usr/hospital

EXPOSE 8083

ADD ./target/appointment-0.0.1-SNAPSHOT.jar /usr/hospital/appointment.jar

ENTRYPOINT ["java", "-jar", "appointment.jar"]
