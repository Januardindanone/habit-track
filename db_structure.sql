DROP TABLE IF EXISTS `habits-db`;

CREATE TABLE `habit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `habit` varchar(100) NOT NULL,
  `jam` time DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_habit` (`habit`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `hari`;
CREATE TABLE `hari` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hari` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `hari_habit`;
CREATE TABLE `hari_habit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_habit` int NOT NULL,
  `id_hari` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_habit_hari` (`id_habit`,`id_hari`),
  KEY `id_hari` (`id_hari`),
  CONSTRAINT `hari_habit_ibfk_1` FOREIGN KEY (`id_habit`) REFERENCES `habit` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hari_habit_ibfk_2` FOREIGN KEY (`id_hari`) REFERENCES `hari` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `riwayat`;
CREATE TABLE `riwayat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_habit` int NOT NULL,
  `tanggal` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_habit` (`id_habit`),
  CONSTRAINT `riwayat_ibfk_1` FOREIGN KEY (`id_habit`) REFERENCES `habit` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
