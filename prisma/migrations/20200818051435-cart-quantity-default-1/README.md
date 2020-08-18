# Migration `20200818051435-cart-quantity-default-1`

This migration has been generated by Claudio Romano at 8/18/2020, 7:14:35 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_CartItem" (
"id" TEXT NOT NULL,
"productId" TEXT NOT NULL,
"quantity" INTEGER NOT NULL DEFAULT 1,
"cartId" TEXT NOT NULL,
PRIMARY KEY ("id"),
FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

INSERT INTO "new_CartItem" ("id", "productId", "quantity", "cartId") SELECT "id", "productId", "quantity", "cartId" FROM "CartItem"

PRAGMA foreign_keys=off;
DROP TABLE "CartItem";;
PRAGMA foreign_keys=on

ALTER TABLE "new_CartItem" RENAME TO "CartItem";

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200818045642-cart..20200818051435-cart-quantity-default-1
--- datamodel.dml
+++ datamodel.dml
@@ -1,11 +1,12 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator prisma_client {
-  provider = "prisma-client-js"
+  provider        = "prisma-client-js"
+  previewFeatures = ["connectOrCreate"]
 }
 model BlogPost {
   id        String  @default(uuid()) @id
@@ -42,9 +43,9 @@
   id        String  @default(uuid()) @id
   product   Product @relation(fields: [productId], references: [id])
   productId String
   cart      Cart    @relation(fields: [cartId], references: [id])
-  quantity  Int
+  quantity  Int     @default(1)
   cartId    String
 }
 model Cart {
```

