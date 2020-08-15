# Migration `20200814214144-add-pages`

This migration has been generated by Marco Wettstein at 8/14/2020, 11:41:45 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "Page" (
"id" TEXT NOT NULL,
"published" BOOLEAN  DEFAULT false,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"path" TEXT ,
"slug" TEXT NOT NULL,
"sortKey" INTEGER  DEFAULT 100,
"parentPageId" TEXT ,
"navigationTitle_en" TEXT NOT NULL,
"navigationTitle_de" TEXT ,
"htmlTitle_en" TEXT NOT NULL,
"htmlTitle_de" TEXT ,
"content" TEXT ,
"meta_description_en" TEXT ,
"meta_description_de" TEXT ,
"social_description_en" TEXT ,
"social_description_de" TEXT ,
"social_title_en" TEXT ,
"social_title_de" TEXT ,
PRIMARY KEY ("id"),
FOREIGN KEY ("parentPageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE UNIQUE INDEX "Page.path_unique" ON "Page"("path")

CREATE UNIQUE INDEX "Page.parentPageId_slug_unique" ON "Page"("parentPageId","slug")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200813145412-make-blog-post-content-optional..20200814214144-add-pages
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
     provider = "sqlite"
-    url = "***"
+    url = "***"
 }
 generator prisma_client {
     provider = "prisma-client-js"
@@ -27,4 +27,34 @@
     password  String
     blogPosts BlogPost[]
     roles     UserRole[]
 }
+
+model Page {
+    id                 String   @default(uuid()) @id
+    published          Boolean? @default(false)
+    createdAt          DateTime @default(now())
+    path               String?  @unique
+    slug               String
+    sortKey            Int?     @default(100)
+    parentPageId       String?
+    parentPage         Page?    @relation("parentChild", fields: [parentPageId], references: [id])
+    childPages         Page[]   @relation("parentChild")
+    navigationTitle_en String
+    navigationTitle_de String?
+
+    htmlTitle_en String
+    htmlTitle_de String?
+
+    content             String? // is multilang already
+    meta_description_en String?
+    meta_description_de String?
+
+    social_description_en String?
+    social_description_de String?
+
+    social_title_en String?
+    social_title_de String?
+
+
+    @@unique([parentPageId, slug])
+}
```

