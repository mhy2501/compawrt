CREATE TABLE "users" (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (255) UNIQUE NOT NULL,
    first_name VARCHAR (255) NOT NULL,
    last_name VARCHAR (255) NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL,
    is_citizen BOOLEAN DEFAULT TRUE,
    organization_id INTEGER FOREIGN KEY REFERENCES organization(organization_id),
    inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "organization" (
    organization_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    organization_name VARCHAR (255) NOT NULL,
    organization_street_address VARCHAR (255),
    organization_barangay_address VARCHAR (255),
    organization_municipality_address VARCHAR (255),
    organization_province_address VARCHAR (255),
    inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "report" (
    report_id INTEGER PRIMARY KEY GENERATED  ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL FOREIGN KEY REFERENCES users(user_id), 
    report_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_seen_at_street_name VARCHAR (255) NOT NULL,
    last_seen_at_barangay_name VARCHAR (255) NOT NULL,
    last_seen_at_municipality_name VARCHAR (255) NOT NULL,
    last_seen_at_province_name VARCHAR (255) NOT NULL,
    landmarks VARCHAR (255) NOT NULL,
    type_of_animal VARCHAR (255) NOT NULL,
    image_of_stray_url VARCHAR (255) NOT NULL,
    status VARCHAR (255) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "animal_info" (
    animal_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL FOREIGN KEY REFERENCES users(user_id),
    pet_name VARCHAR (255) NOT NULL,
    age INTEGER NOT NULL,
    image_url VARCHAR (255) NOT NULL,
    for_adoption BOOLEAN NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);