--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '8217d4f2-96d0-4321-a49b-b55f24925f44', 'authenticated', 'authenticated', 'hoge@gmail.com', '$2a$10$y4bhjVyRgSTZ3VT6h.tEXOZs1Oa.W0PdLlvL5j4Q3ByiS8iTAr3Q6', '2023-01-08 13:08:10.228563+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-01-08 13:08:10.232347+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-01-08 13:08:10.211817+00', '2023-01-08 13:08:10.236067+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES ('8217d4f2-96d0-4321-a49b-b55f24925f44', 'hogeちゃん', '', '', '2023-01-08 22:09:12+00', '2023-01-08 22:09:12+00', 'hogechan');


--
-- Data for Name: favorite_shops; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.favorite_shops VALUES (1, '8217d4f2-96d0-4321-a49b-b55f24925f44', '豊洲酒場', '東京都江東区豊洲５-5-1', 'ダイニングバー・バル', 'https://www.hotpepper.jp/strJ001294101/?vos=nhppalsa000016', 'あり', '利用可', '2023-01-08 22:09:52+00', '2023-01-08 22:09:52+00');
INSERT INTO public.favorite_shops VALUES (3, '8217d4f2-96d0-4321-a49b-b55f24925f44', 'モンスタービーフ 豊洲店', '東京都江東区豊洲５-5-1-209', 'ダイニングバー・バル', 'https://www.hotpepper.jp/strJ001251515/?vos=nhppalsa000016', 'あり', '利用可', '2023-01-08 22:09:52+00', '2023-01-08 22:09:52+00');
INSERT INTO public.favorite_shops VALUES (4, '8217d4f2-96d0-4321-a49b-b55f24925f44', '中国薬膳火鍋専門店 小肥羊 豊洲店 シャオフェイヤン', '東京都江東区豊洲２-4-9ベイサイドクロス1階', '中華', 'https://www.hotpepper.jp/strJ001245831/?vos=nhppalsa000016', 'あり', '利用可', '2023-01-08 22:09:52+00', '2023-01-08 22:09:52+00');
INSERT INTO public.favorite_shops VALUES (5, '8217d4f2-96d0-4321-a49b-b55f24925f44', '山紫炉 SUN SEA RO', '東京都江東区豊洲４-1-1　豊洲ピア21　5F', '居酒屋', 'https://www.hotpepper.jp/strJ000685784/?vos=nhppalsa000016', 'なし', '利用可', '2023-01-08 22:09:52+00', '2023-01-08 22:09:52+00');


--
-- Name: favorite_shops_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorite_shops_id_seq', 5, true);


--
-- PostgreSQL database dump complete
--

