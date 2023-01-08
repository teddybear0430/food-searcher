# 今日なにたべていきてこ

位置情報を元に近所の飲食店を検索したり、共有したりすることができるアプリケーションです。

## 使ってる技術

- TypeScript
- React
- Next.js
- Tailwind CSS
- swr
- GraphQL
- Apollo Server
- vercel
- supabase

## ローカル環境立ち上げ

```
supabase start
```

## ローカル環境停止

```
supabase stop
```

## DBのdump

password: postgres

> 参考: https://github.com/supabase/supabase/discussions/6056

```
/usr/local/opt/libpq/bin/pg_dump -h localhost -p 54322 -d postgres -U postgres \
           --table='auth.users' \
           --table='users' \
           --table='favorite_shops' \
           --data-only \
           --inserts > supabase/seed.sql
```
