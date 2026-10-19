CREATE TABLE `ai_usage` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`day` text NOT NULL,
	`hour` text NOT NULL,
	`client` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `ai_usage_day` ON `ai_usage` (`day`);--> statement-breakpoint
CREATE INDEX `ai_usage_client_hour` ON `ai_usage` (`client`,`hour`);