CREATE TABLE "features_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"markdown" text NOT NULL,
	"site_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "website_members_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"website_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"role" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "website_members_table_website_id_user_id_unique" UNIQUE("website_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "websites_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"url" text NOT NULL,
	CONSTRAINT "websites_table_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "features_table" ADD CONSTRAINT "features_table_site_id_websites_table_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."websites_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_members_table" ADD CONSTRAINT "website_members_table_website_id_websites_table_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites_table"("id") ON DELETE cascade ON UPDATE no action;