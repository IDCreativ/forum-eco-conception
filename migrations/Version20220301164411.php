<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220301164411 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE contest (id INT AUTO_INCREMENT NOT NULL, event_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, status TINYINT(1) NOT NULL, question_status INT NOT NULL, INDEX IDX_1A95CB571F7E88B (event_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contest_entry (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, contest_option_id INT NOT NULL, contest_question_id INT NOT NULL, INDEX IDX_275CED58A76ED395 (user_id), INDEX IDX_275CED58594B97E (contest_option_id), INDEX IDX_275CED589C45100E (contest_question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contest_option (id INT AUTO_INCREMENT NOT NULL, contest_question_id INT NOT NULL, option_text LONGTEXT NOT NULL, INDEX IDX_6F3FD53A9C45100E (contest_question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contest_question (id INT AUTO_INCREMENT NOT NULL, contest_id INT NOT NULL, question VARCHAR(255) NOT NULL, status INT NOT NULL, INDEX IDX_81222A6D1CD0F0DE (contest_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE contest ADD CONSTRAINT FK_1A95CB571F7E88B FOREIGN KEY (event_id) REFERENCES event (id)');
        $this->addSql('ALTER TABLE contest_entry ADD CONSTRAINT FK_275CED58A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE contest_entry ADD CONSTRAINT FK_275CED58594B97E FOREIGN KEY (contest_option_id) REFERENCES contest_option (id)');
        $this->addSql('ALTER TABLE contest_entry ADD CONSTRAINT FK_275CED589C45100E FOREIGN KEY (contest_question_id) REFERENCES contest_question (id)');
        $this->addSql('ALTER TABLE contest_option ADD CONSTRAINT FK_6F3FD53A9C45100E FOREIGN KEY (contest_question_id) REFERENCES contest_question (id)');
        $this->addSql('ALTER TABLE contest_question ADD CONSTRAINT FK_81222A6D1CD0F0DE FOREIGN KEY (contest_id) REFERENCES contest (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contest_question DROP FOREIGN KEY FK_81222A6D1CD0F0DE');
        $this->addSql('ALTER TABLE contest_entry DROP FOREIGN KEY FK_275CED58594B97E');
        $this->addSql('ALTER TABLE contest_entry DROP FOREIGN KEY FK_275CED589C45100E');
        $this->addSql('ALTER TABLE contest_option DROP FOREIGN KEY FK_6F3FD53A9C45100E');
        $this->addSql('DROP TABLE contest');
        $this->addSql('DROP TABLE contest_entry');
        $this->addSql('DROP TABLE contest_option');
        $this->addSql('DROP TABLE contest_question');
    }
}
