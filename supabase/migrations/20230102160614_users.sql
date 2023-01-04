create table "public"."users" (
    "id" uuid not null,
    "name" character varying,
    "location" character varying,
    "profile" text,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "user_id" character varying
);


CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);
CREATE UNIQUE INDEX users_user_id_key ON public.users USING btree (user_id);
CREATE UNIQUE INDEX users_uuid_key ON public.users USING btree (id);


alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";
alter table "public"."users" add constraint "users_user_id_key" UNIQUE using index "users_user_id_key";
alter table "public"."users" add constraint "users_uuid_key" UNIQUE using index "users_uuid_key";
alter table "public"."users" enable row level security;


create policy "ユーザー情報の作成は認証済みの時のみできる"
on "public"."users"
as permissive
for insert
to authenticated
with check (true);


create policy "ユーザー情報の更新は誰でもできる（認証チェ"
on "public"."users"
as permissive
for update
to public
using (true);


create policy "ユーザー情報の閲覧は誰でもできる"
on "public"."users"
as permissive
for select
to public
using (true);
