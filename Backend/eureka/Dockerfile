FROM openjdk:11

WORKDIR usr/hospital

EXPOSE 8761

ADD ./target/eureka-0.0.1-SNAPSHOT.jar usr/hospital/eureka.jar

ENTRYPOINT ["java", "-jar", "eureka.jar"]