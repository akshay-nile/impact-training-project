start cmd @cmd /k "cd ./eureka && mvn spring-boot:run"
start cmd @cmd /k "cd ./hospital && mvn spring-boot:run"
start cmd @cmd /k "cd ./admin && mvn spring-boot:run"

start cmd @cmd /k "cd ./NotesService && mvn spring-boot:run"
start cmd @cmd /k "cd ./AppointmentService && mvn spring-boot:run"
start cmd @cmd /k "cd ./patient-visits && mvn spring-boot:run"
start cmd @cmd /k "cd ./authentication && mvn spring-boot:run"

start cmd @cmd /k "cd ./gateway && mvn spring-boot:run"
