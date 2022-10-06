USE telepizzamysql;

CREATE TABLE users(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(180) NOT NULL UNIQUE,
    name VARCHAR(90) NOT NULL,
    lastname VARCHAR(90) NOT NULL,
    phone VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    password VARCHAR(90) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

CREATE TABLE roles(
	id BIGINT primary key auto_increment,
    name varchar(90) not null unique,
    image varchar(255) null,
    route varchar(200) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);

insert into roles(
	name,
    route,
    created_at,
    updated_at
)
values(
	"RESTAURANTE",
    "/restaurant/orders/list",
	"2022-09-06",
    "2022-09-06"
);

insert into roles(
	name,
    route,
    created_at,
    updated_at
)
values(
	"REPARTIDOR",
    "/restaurant/orders/list",
	"2022-09-06",
    "2022-09-06"
);

insert into roles(
	name,
    route,
    created_at,
    updated_at
)
values(
	"CLIENTE",
    "/client/products/list",
	"2022-09-06",
    "2022-09-06"
);

create table user_has_roles(
	id_user bigint not null,
    id_role bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    foreign key(id_user) references users(id) on update cascade on delete cascade,
    foreign key(id_role) references roles(id) on update cascade on delete cascade,
    primary key(id_user,id_role)
);

create table categories(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name Varchar(180) not null,
    description text not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
)

create table products(
	id bigint primary key auto_increment,
    name varchar(180) not null unique,
    description text not null,
    price decimal not null,
    image1 varchar(255) null,
    image2 varchar(255) null,
    image3 varchar(255) null,
    id_category bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    foreign key(id_category) references categories(id) on update cascade on delete cascade
);

create table address(
	id bigint primary key auto_increment,
    address varchar(255) not null,
    neighborhood varchar(255) not null,
    lat double not null,
    lng double not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
	id_user bigint not null,
    foreign key(id_user) references users(id) on update cascade on delete cascade
);

create table orders(
	id bigint primary key auto_increment,
    id_client bigint not null,
    id_delivery bigint null,
	id_address bigint not null,
    lat double ,
    lng double,
    status varchar(90) not null,
    timestamp bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    foreign key(id_client) references users(id) on update cascade on delete cascade,
    foreign key(id_delivery) references users(id) on update cascade on delete cascade,
    foreign key(id_address) references address(id) on update cascade on delete cascade
)

create table order_has_produccts(
	id_order bigint not null,
    id_product bigint not null,
    quantity bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    primary key(id_order,id_product),
    foreign key(id_order) references orders(id) on update cascade on delete cascade,
    foreign key(id_product) references products(id) on update cascade on delete cascade
)

select
	CONVERT(O.id,char) as id,
    CONVERT(O.id_client,char) as id_client,
	CONVERT(O.id_address,char) as id_address,
    CONVERT(O.id_delivery,char) as id_delivery,
    O.status,
    O.timestamp,
    O.lat,
    O.lng,
    json_object(
        "id",CONVERT(A.id,char),
        "address",A.address,
        "neighborhood",A.neighborhood,
        "lat",A.lat,
        "lng",A.lng
    ) as address,
    json_object(
		"id",CONVERT(U.id,char),  
        "name",U.name,
        "lastname",U.lastname,
        "image",U.image
    ) as client,
    json_arrayagg(
     json_object(
        "id",CONVERT(P.id,char),
        "name",P.name,
        "description",P.description,
        "price", P.price,
        "image1",P.image1,
        "image2", P.image2,
        "image3", P.image3,
        "quantity", OHP.quantity
     )
   ) as arrayproducts
from 
	orders as O
inner join 
	users as U
on
	U.id = O.id_client
inner join
	address as A
on 
	A.id = O.id_address
inner join 
	order_has_produccts as OHP
on
	OHP.id_order = O.id
inner join 
	products as P
on 
	P.id = OHP.id_product
where
	status = "PAGADO"
group by 
	O.id;