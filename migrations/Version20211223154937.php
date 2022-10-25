<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211223154937 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event_date ADD venue_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE event_date ADD CONSTRAINT FK_B5557BD140A73EBA FOREIGN KEY (venue_id) REFERENCES venue (id)');
        $this->addSql('CREATE INDEX IDX_B5557BD140A73EBA ON event_date (venue_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event_date DROP FOREIGN KEY FK_B5557BD140A73EBA');
        $this->addSql('DROP INDEX IDX_B5557BD140A73EBA ON event_date');
        $this->addSql('ALTER TABLE event_date DROP venue_id');
    }
}
