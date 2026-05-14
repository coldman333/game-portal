import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "games" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_games_v" ADD COLUMN "version_subtitle" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "games" DROP COLUMN "subtitle";
  ALTER TABLE "_games_v" DROP COLUMN "version_subtitle";`)
}
