create table languages(
languageId  serial primary key ,
	language varchar(10)
);

create table Allergies(
allergyId serial primary key,
	type varchar(20),
	name varchar(20),
	description varchar(20),
	clinical_info varchar(20),
	is_fatal boolean 
);

create table Emergency_Contact(
	emergencyContactId serial primary key,
	firstName varchar(20),
	lastName varchar(20),
	relationship varchar(20),
	email varchar(20),
	phone varchar(10),
	address varchar(30),
	access_allow boolean
);

create table visitdetails(
	visitId serial primary key,
	height float8,
	weight float8,
	blood_pressure float8,
	body_temperature float8,
	respiration_rate float8,
	patient_id int references Patient(patient_Id)
);

create table Patient(
	patient_id serial primary key,
	title varchar(10),
	firstName varchar(20),
	lastName varchar(20),
	birth_date date,
	age int,
	gender varchar(10),
	email varchar(20),
	phone varchar(10),
	address varchar(30),
	languageId int references languages(languageId),
	allergyId int references Allergies(allergyId),
	emergencyContactId int references Emergency_Contact(emergencyContactId)
);