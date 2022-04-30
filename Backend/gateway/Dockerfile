FROM openjdk:11

WORKDIR /usr/hospital

EXPOSE 8080

ADD ./target/gateway-0.0.1-SNAPSHOT.jar /usr/hospital/gateway.jar

ENTRYPOINT ["java", "-jar", "gateway.jar"]