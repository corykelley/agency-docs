CREATE TABLE "Features" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"feature_name" varchar NOT NULL,
	"markdown" text NOT NULL
);
