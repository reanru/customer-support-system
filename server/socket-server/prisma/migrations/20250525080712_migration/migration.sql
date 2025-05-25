/*
  Warnings:

  - You are about to drop the column `createdAt` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `assignedTo` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `visitorId` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `sender_type` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_sessionId_fkey`;

-- DropIndex
DROP INDEX `messages_senderId_fkey` ON `messages`;

-- DropIndex
DROP INDEX `messages_sessionId_fkey` ON `messages`;

-- AlterTable
ALTER TABLE `messages` DROP COLUMN `createdAt`,
    DROP COLUMN `from`,
    DROP COLUMN `senderId`,
    DROP COLUMN `sessionId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `read_at` DATETIME(3) NULL,
    ADD COLUMN `sender_id` VARCHAR(191) NULL,
    ADD COLUMN `sender_type` ENUM('ADMIN', 'AGENT', 'USER') NOT NULL,
    ADD COLUMN `session_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `sessions` DROP COLUMN `assignedTo`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `isActive`,
    DROP COLUMN `visitorId`,
    ADD COLUMN `assigned_to` VARCHAR(191) NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `status` ENUM('WAITING', 'ASSIGNED', 'ACTIVE', 'RESOLVED', 'CLOSED', 'EXPIRED', 'ABANDONED') NOT NULL,
    ADD COLUMN `visitor_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
