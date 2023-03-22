<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230322004644 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE extra_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE hideout_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE picture_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE trip_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE trip_day_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE trip_stage_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE extra (id INT NOT NULL, trip_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_4D3F0D65A5BC2E0E ON extra (trip_id)');
        $this->addSql('CREATE TABLE hideout (id INT NOT NULL, name VARCHAR(255) NOT NULL, lat VARCHAR(255) DEFAULT NULL, lng VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE picture (id INT NOT NULL, trip_day_id INT NOT NULL, name VARCHAR(255) NOT NULL, shot_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, lat VARCHAR(255) DEFAULT NULL, lng VARCHAR(255) DEFAULT NULL, image_name VARCHAR(255) DEFAULT NULL, image_size INT DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_16DB4F89E6CD1A8C ON picture (trip_day_id)');
        $this->addSql('COMMENT ON COLUMN picture.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE picture_extra (picture_id INT NOT NULL, extra_id INT NOT NULL, PRIMARY KEY(picture_id, extra_id))');
        $this->addSql('CREATE INDEX IDX_CDE58A2BEE45BDBF ON picture_extra (picture_id)');
        $this->addSql('CREATE INDEX IDX_CDE58A2B2B959FC6 ON picture_extra (extra_id)');
        $this->addSql('CREATE TABLE trip (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE trip_day (id INT NOT NULL, start_hideout_id INT DEFAULT NULL, end_hideout_id INT DEFAULT NULL, trip_stage_id INT NOT NULL, name VARCHAR(255) NOT NULL, date DATE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6969D02A9B578029 ON trip_day (start_hideout_id)');
        $this->addSql('CREATE INDEX IDX_6969D02AE7D07759 ON trip_day (end_hideout_id)');
        $this->addSql('CREATE INDEX IDX_6969D02A8AC9E283 ON trip_day (trip_stage_id)');
        $this->addSql('CREATE TABLE trip_stage (id INT NOT NULL, trip_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, lat VARCHAR(255) DEFAULT NULL, lng VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1837132AA5BC2E0E ON trip_stage (trip_id)');
        $this->addSql('CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)');
        $this->addSql('CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)');
        $this->addSql('CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)');
        $this->addSql('CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
            BEGIN
                PERFORM pg_notify(\'messenger_messages\', NEW.queue_name::text);
                RETURN NEW;
            END;
        $$ LANGUAGE plpgsql;');
        $this->addSql('DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;');
        $this->addSql('CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON messenger_messages FOR EACH ROW EXECUTE PROCEDURE notify_messenger_messages();');
        $this->addSql('ALTER TABLE extra ADD CONSTRAINT FK_4D3F0D65A5BC2E0E FOREIGN KEY (trip_id) REFERENCES trip (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE picture ADD CONSTRAINT FK_16DB4F89E6CD1A8C FOREIGN KEY (trip_day_id) REFERENCES trip_day (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE picture_extra ADD CONSTRAINT FK_CDE58A2BEE45BDBF FOREIGN KEY (picture_id) REFERENCES picture (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE picture_extra ADD CONSTRAINT FK_CDE58A2B2B959FC6 FOREIGN KEY (extra_id) REFERENCES extra (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE trip_day ADD CONSTRAINT FK_6969D02A9B578029 FOREIGN KEY (start_hideout_id) REFERENCES hideout (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE trip_day ADD CONSTRAINT FK_6969D02AE7D07759 FOREIGN KEY (end_hideout_id) REFERENCES hideout (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE trip_day ADD CONSTRAINT FK_6969D02A8AC9E283 FOREIGN KEY (trip_stage_id) REFERENCES trip_stage (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE trip_stage ADD CONSTRAINT FK_1837132AA5BC2E0E FOREIGN KEY (trip_id) REFERENCES trip (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE extra_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE hideout_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE picture_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE trip_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE trip_day_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE trip_stage_id_seq CASCADE');
        $this->addSql('ALTER TABLE extra DROP CONSTRAINT FK_4D3F0D65A5BC2E0E');
        $this->addSql('ALTER TABLE picture DROP CONSTRAINT FK_16DB4F89E6CD1A8C');
        $this->addSql('ALTER TABLE picture_extra DROP CONSTRAINT FK_CDE58A2BEE45BDBF');
        $this->addSql('ALTER TABLE picture_extra DROP CONSTRAINT FK_CDE58A2B2B959FC6');
        $this->addSql('ALTER TABLE trip_day DROP CONSTRAINT FK_6969D02A9B578029');
        $this->addSql('ALTER TABLE trip_day DROP CONSTRAINT FK_6969D02AE7D07759');
        $this->addSql('ALTER TABLE trip_day DROP CONSTRAINT FK_6969D02A8AC9E283');
        $this->addSql('ALTER TABLE trip_stage DROP CONSTRAINT FK_1837132AA5BC2E0E');
        $this->addSql('DROP TABLE extra');
        $this->addSql('DROP TABLE hideout');
        $this->addSql('DROP TABLE picture');
        $this->addSql('DROP TABLE picture_extra');
        $this->addSql('DROP TABLE trip');
        $this->addSql('DROP TABLE trip_day');
        $this->addSql('DROP TABLE trip_stage');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
