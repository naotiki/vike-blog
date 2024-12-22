ALTER TABLE `posts` RENAME COLUMN "text" TO "title";--> statement-breakpoint
ALTER TABLE `posts` ADD `content` text NOT NULL;