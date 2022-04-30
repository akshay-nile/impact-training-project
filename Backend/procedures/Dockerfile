FROM openjdk:11

WORKDIR /usr/hospital

EXPOSE 8089

ADD ./target/procedure-0.0.1-SNAPSHOT.jar /usr/hospital/procedure.jar
ADD ./procedure_data.txt /usr/hospital/procedure_data.txt

ENTRYPOINT ["java", "-jar", "procedure.jar"]
