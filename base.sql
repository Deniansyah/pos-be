CREATE DATABASE pos;

CREATE TABLE "users" (
    "id"              INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture"         VARCHAR(255),
    "name"        VARCHAR(255) NOT NULL,
    "email"           VARCHAR(255) NOT NULL,
    "password"        VARCHAR(255) NOT NULL,
    "role"            INT NOT NULL,     -- 1 = Admin & 2 = Cashier
    "createdAt"       TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt"       TIMESTAMPTZ
);

CREATE TABLE "categories" (
    "id"              INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name"            VARCHAR(255) NOT NULL,
    "createdAt"       TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt"       TIMESTAMPTZ
);

CREATE TABLE "product" (
    "id"              INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "categories_id"   INT NOT NULL REFERENCES "categories"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "picture"         VARCHAR(255),
    "name"            VARCHAR(255) NOT NULL,
    "description"     TEXT,
    "price"           BIGINT NOT NULL,
    "createdAt"       TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt"       TIMESTAMPTZ
);

CREATE SEQUENCE invoice_seq START 1;

CREATE TABLE "transaction" (
    "id"              INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "users_id"        INT NOT NULL REFERENCES "users"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "invoice"         VARCHAR(10) DEFAULT concat('INV', LPAD(nextval('invoice_seq')::text, 6, '0')),
    "date"            DATE,
    "total"           BIGINT,
    "createdAt"       TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt"       TIMESTAMPTZ
);

CREATE TABLE "detailTransaction" (
    "id"              INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "transaction_id"  INT NOT NULL REFERENCES "transaction"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "product_id"      INT NOT NULL REFERENCES "product"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "product_name"    VARCHAR(255),
    "product_price"   BIGINT,
    "qty"             INT,
    "createdAt"       TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt"       TIMESTAMPTZ
);







