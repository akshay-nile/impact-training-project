FROM openjdk:11

WORKDIR /usr/hospital

EXPOSE 8090

ADD ./target/allergy-0.0.1-SNAPSHOT.jar /usr/hospital/allergy.jar
ADD ./allergy_data.txt /usr/hospital/allergy_data.txt

ENTRYPOINT ["java", "-jar", "allergy.jar"]
