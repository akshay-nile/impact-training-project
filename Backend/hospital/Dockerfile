FROM openjdk:11

WORKDIR /usr/hospital

EXPOSE 8082

ADD ./target/hospital-0.0.1-SNAPSHOT.jar /usr/hospital/hospital.jar

ENTRYPOINT ["java", "-jar", "hospital.jar"]
