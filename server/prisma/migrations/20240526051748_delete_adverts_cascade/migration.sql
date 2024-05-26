-- DropForeignKey
ALTER TABLE "adverts" DROP CONSTRAINT "adverts_user_id_fkey";

-- AddForeignKey
ALTER TABLE "adverts" ADD CONSTRAINT "adverts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
