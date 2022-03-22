-- Akshay's work (tables required for registration and login module) --

drop table if exists employees;
create table employees (
	employee_id serial primary key,
	title varchar(10),
	firstname varchar(20) not null,
	lastname varchar(20) not null,
	email varchar(20) unique not null constraint check_email check (email ~* '^(.+)@(.+)$'),
	birthdate date not null,
	role varchar(10) not null constraint check_role check (role in ('admin', 'doctor', 'nurse')),
	specialization varchar(10),
	password int not null,
	status varchar(10) not null constraint check_status check (status in ('active', 'inactive', 'blocked'))
);

drop table if exists patients;
create table patients (
	patient_id serial primary key,
	title varchar(10),
	firstname varchar(20) not null,
	lastname varchar(20) not null,
	email varchar(20) unique not null constraint check_email check (email ~* '^(.+)@(.+)$'),
	phone varchar(20) unique not null constraint check_phone check (phone ~* '^\+\d+\s\d{10}$'),
	birthdate date not null,
	password int not null,
	status varchar(10) not null constraint check_status check (status in ('active', 'inactive', 'blocked'))
);

drop table if exists demographics;
create table demographics (
	patient_id int primary key references patients(patient_id) on delete cascade,
	age int not null constraint check_age check (age >= 18),
	gender varchar(10) not null constraint check_gender check (gender in ('male', 'female')),
	race varchar(10),
	ethnicity varchar(10),
	languages varchar(40) not null,
	address text not null
);

drop table if exists nominees;
create table nominees (
	patient_id int primary key references patients(patient_id) on delete cascade,
	title varchar(10),
	firstname varchar(20) not null,
	lastname varchar(20) not null,
	relation varchar(10) not null,
	email varchar(20) unique not null constraint check_email check (email ~* '^(.+)@(.+)$'),
	phone varchar(20) unique not null constraint check_phone check (phone ~* '^\+\d+\s\d{10}$'),
	address text not null,
	access_allowed boolean
);
	


-- Tejas work (Master tables including allergies, drugs, medications, diagnosis, etc) --

drop table if exists allergies;
create table allergies (
	allergy_id serial primary key,
	allergy_type varchar(20) unique not null,
	allergy_name varchar(20) not null,
	description text not null,
	clinical_info varchar(40) not null,
	is_fatal boolean,
	patient_id int references patients(patient_id) on delete cascade
);

drop table if exists drugs;
create table drugs (
	drug_id serial primary key,
	drug_name varchar(20) unique not null,
	generic_name varchar(20) not null,
	brand_name varchar(20) not null,
	drug_form varchar(20) not null
);

drop table if exists medications;
create table medications (
	medication_id serial primary key,
	drug_id int references drugs(drug_id) on delete cascade,
	drug_strength varchar(20) not null
);

drop table if exists diagnosis;
create table diagnosis (
	diagnosis_id serial primary key,
	description text not null,
	diagnosis_code varchar(10) unique not null,
	is_depricated boolean,
	patient_id int references patients(patient_id) on delete cascade,
	employee_id int references employees(employee_id) on delete cascade
);



-- Vinay's work (Procedures table) --

drop table if exists procedures;
create table procedures (
	procedure_id serial primary key,
	procedure_name varchar(40) not null,
	description text not null,
	patient_id int references patients(patient_id) on delete cascade,
	employee_id int references employees(employee_id) on delete cascade
);



-- Thirupathi's work (Patient visit_details, appointments & notes table) --

drop table if exists appointments;
create table appointments (
	appointment_id serial primary key,
	meeting_title varchar(40) not null,
	description varchar(200) not null,
	appointment_date date not null,
	time_slot varchar(20) not null constraint check_time_slot check(time_slot in ('morning','afternoon','evening')),				
	patient_id int references patients(patient_id) on delete cascade not null,
	employee_id int references employees(employee_id) on delete cascade not null,
	reason_for_edit varchar(200)
);

drop table if exists notes;
create table notes (
	note_id serial primary key,
	description varchar(200),	
	patient_id int references patients(patient_id) not null,				   
	from_employee_id int references employees(employee_id) not null,
	to_employee_id int references employees(employee_id) not null,
	created_on timestamp				   
);

drop table if exists visit_details;
create table visit_details (
	visit_id int primary key,
	height int constraint check_height check(height < 250) not null,
	weight float not null,
	temperature float not null,
	blood_pressure int not null,
	respiration_rate int not null,
	patient_id int references patients(patient_id) not null								   
);




