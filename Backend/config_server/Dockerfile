FROM openjdk:11

WORKDIR /usr/hospital

EXPOSE 8091

ADD ./target/config-server-0.0.1-SNAPSHOT.jar /usr/hospital/config-server.jar

ENTRYPOINT ["java", "-jar", "config-server.jar"]
