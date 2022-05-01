FROM openjdk:11

WORKDIR /usr/hospital

EXPOSE 8085

ADD ./target/patient-visits-0.0.1-SNAPSHOT.jar /usr/hospital/patient-visits.jar

ENTRYPOINT ["java", "-jar", "patient-visits.jar"]
