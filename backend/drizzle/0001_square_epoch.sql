CREATE TABLE "translations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "translations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"language" varchar(255) NOT NULL,
	"translations" json NOT NULL
);
