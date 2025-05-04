/*
  Warnings:

  - A unique constraint covering the columns `[name,brand,category,price]` on the table `Component` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Component_name_brand_category_price_key" ON "Component"("name", "brand", "category", "price");
