FROM java:8-jre
ADD ./target/ReminderService-0.0.1-SNAPSHOT.jar /usr/src/ReminderService-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar","ReminderService-0.0.1-SNAPSHOT.jar"]