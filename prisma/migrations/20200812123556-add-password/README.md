# Migration `20200812123556-add-password`

This migration has been generated by Marco Wettstein at 8/12/2020, 2:35:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "password" text  NOT NULL ;

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200812115802-initial..20200812123556-add-password
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
     provider = "postgresql"
-    url = "***"
+    url = "***"
 }
 generator prisma_client {
     provider = "prisma-client-js"
@@ -17,7 +17,8 @@
 }
 model User {
     id        String     @default(uuid()) @id
-    email     String
+    email     String     @unique
+    password  String
     blogPosts BlogPost[]
 }
```

