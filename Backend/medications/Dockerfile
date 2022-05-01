FROM openjdk:11

WORKDIR /usr/hospital

EXPOSE 8087

ADD ./target/medication-0.0.1-SNAPSHOT.jar /usr/hospital/medication.jar
ADD ./medication_data.txt /usr/hospital/medication_data.txt

ENTRYPOINT ["java", "-jar", "medication.jar"]
