FROM openjdk:11

WORKDIR /usr/hospital

EXPOSE 8086

ADD ./target/diagnosis-0.0.1-SNAPSHOT.jar /usr/hospital/diagnosis.jar
ADD ./diagnosis_data.txt /usr/hospital/diagnosis_data.txt

ENTRYPOINT ["java", "-jar", "diagnosis.jar"]
