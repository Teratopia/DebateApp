-- MySQL dump 10.13  Distrib 5.6.33, for osx10.9 (x86_64)
--
-- Host: localhost    Database: debatedb
-- ------------------------------------------------------
-- Server version	5.6.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `argument`
--

DROP TABLE IF EXISTS `argument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `argument` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pm_id` int(11) NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` varchar(512) NOT NULL,
  `linkref` varchar(1012) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  KEY `user_id` (`user_id`),
  KEY `pm_id` (`pm_id`),
  CONSTRAINT `argument_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
  CONSTRAINT `argument_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `argument_ibfk_3` FOREIGN KEY (`pm_id`) REFERENCES `performance_member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `argument`
--

LOCK TABLES `argument` WRITE;
/*!40000 ALTER TABLE `argument` DISABLE KEYS */;
INSERT INTO `argument` VALUES (28,92,50,29,'2017-02-08 20:27:54','test',''),(29,92,50,29,'2017-02-08 20:28:04','test','Yeah');
/*!40000 ALTER TABLE `argument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(42) DEFAULT NULL,
  `description` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (10,'Combat','Two men enter; one man leaves.'),(12,'Science','If we knew what we were doing it wouldn\'t be called research.'),(14,'Economics','In the long run, we\'re all dead.'),(15,'Literature','Literature is the most agreeable way of ignoring life.'),(16,'Art','We don\'t make mistakes, just happy little accidents.'),(17,'Sports','Let that be a lesson to you all. Nobody beats Vitas Gerulaitis 17 times in a row.'),(18,'Law','If it weren\'t for lawyers we wouldn\'t need them.'),(19,'Ethics','Peace means far more than the opposite of war.'),(20,'Religion','Hate the sin, love the sinner.'),(21,'Health','Be careful about reading health books. You may die of a misprint.'),(22,'Politics','Things are more like they are now than they ever were before.'),(23,'Society','Clothes make the man. Naked people have little or no influence on society.'),(24,'Music','I like beautiful melodies telling me terrible things.');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `debate_id` int(11) NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` varchar(256) NOT NULL,
  `linkref` varchar(1012) DEFAULT NULL,
  `comref_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `debate_id` (`debate_id`),
  KEY `comref_id` (`comref_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`debate_id`) REFERENCES `debate` (`id`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`comref_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,51,34,'2017-02-16 04:20:58','this is a test','',NULL);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debate`
--

DROP TABLE IF EXISTS `debate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `debate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `issue_id` int(11) NOT NULL,
  `rules_id` int(11) NOT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `winner_id` int(11) DEFAULT NULL,
  `turn_count` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `issue_id` (`issue_id`),
  KEY `rules_id` (`rules_id`),
  KEY `winner_id` (`winner_id`),
  CONSTRAINT `debate_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`),
  CONSTRAINT `debate_ibfk_2` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`),
  CONSTRAINT `debate_ibfk_3` FOREIGN KEY (`rules_id`) REFERENCES `rules` (`id`),
  CONSTRAINT `debate_ibfk_4` FOREIGN KEY (`winner_id`) REFERENCES `performance` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debate`
--

LOCK TABLES `debate` WRITE;
/*!40000 ALTER TABLE `debate` DISABLE KEYS */;
INSERT INTO `debate` VALUES (34,58,53,'2017-02-01 14:12:49',NULL,0),(35,59,54,'2017-02-08 20:27:00',NULL,3),(36,60,55,'2017-02-10 16:15:52',NULL,0),(37,61,56,'2017-02-10 16:16:35',NULL,0),(38,62,57,'2017-02-10 16:17:44',NULL,0),(39,109,63,'2017-02-17 18:52:17',NULL,0),(40,110,64,'2017-02-17 18:56:25',NULL,0),(41,111,65,'2017-02-17 18:57:51',NULL,0),(42,112,66,'2017-02-17 19:04:07',NULL,0);
/*!40000 ALTER TABLE `debate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue`
--

DROP TABLE IF EXISTS `issue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `issue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(42) NOT NULL,
  `description` varchar(120) DEFAULT NULL,
  `linkref` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue`
--

LOCK TABLES `issue` WRITE;
/*!40000 ALTER TABLE `issue` DISABLE KEYS */;
INSERT INTO `issue` VALUES (58,'Duck vs Horses','1 horse sized duck vs 100 duck sized horses',NULL),(59,'TEST QUIB','Just a test',NULL),(60,'Test Quib','test',NULL),(61,'test',NULL,NULL),(62,'test','test',NULL),(63,'candyland','The game',NULL),(64,'fsdfsdfsd','fdfdfd',NULL),(65,'SDFSDF','FDFDFDF',NULL),(66,'SDFSDF','SDFSDFSDF',NULL),(67,'SDFSDSDF','SDFSDFSDFSD',NULL),(68,'sdfsdfsdf','ssdfsdfsdf',NULL),(69,'SDFSDfsdfd','sdfsdfsdfsdf',NULL),(70,'sdfsdfsdf','sdfsdfsdf',NULL),(71,'sdfsdfsdf','sdfsdfsdfsd',NULL),(72,'SDFSDfsdfd','sdfsdfsdfds',NULL),(73,'sdfsdfsdfsd','sdfsdfdsffd',NULL),(74,'sdfsfdsdf','sfdsfdsfds',NULL),(75,'sdfsdfsdfsdfs','sdfsdfsdfsdfsd',NULL),(76,'sdfsdfsdfsd','sdfsdfsdfsdfs',NULL),(77,'sdfsdfsdfsdfsdf','sdfsdfsdfsdfsd',NULL),(78,'sdfsdfsdfsd','sdfdsfdsfsdfsd',NULL),(79,'sdfsdfsdfds','sdfsdfsdfsd',NULL),(80,'sdfsdfsdfsdsdf','sdfsdfsdfsdfsdfsd',NULL),(81,'sdfsdfsdfsdfsd','sdfsdfsdfsdfsd',NULL),(82,'sdfsdfsdfdd','ddsfdsfsdfsdfs',NULL),(83,'sdfsdfdsdf','sdfdfdfdfddfd',NULL),(84,'sdfsdfsfd','sdfsdfsdfsdf',NULL),(85,'sdfsdfdfd','fsdfsdfsfdfdf',NULL),(86,'sdfsdfff','fdsffdsdsdf',NULL),(87,'sdfdsfsdf','sdfsdfdfdd',NULL),(88,'fdsfdsf','fdfdfdfdfdd',NULL),(89,'fdsfdsfdsfdf','fdfsdfsdfdfdfdfd',NULL),(90,'sdfssdf','fdfdsgsdfdf',NULL),(91,'sdfsdfd','sdfdfdfdfdf',NULL),(92,'sfdfdf','fdfdfs',NULL),(93,'dfsdfd','sdfdsfdsf',NULL),(94,'sdfsdfdsfd','sfdsfdfsdfdf',NULL),(95,'sdfsdfdsd','sdfsdkjh',NULL),(96,'fdfdfd','gfgfgf','dfdfdlkj'),(97,'sdfsdfsdfsdfs','sdfsdfdsf',NULL),(98,'dfsdffd','sdfsdff',NULL),(99,'Testing','Testing',NULL),(100,'Testing','testing',NULL),(101,'Testing','Testing',NULL),(102,'Testing','Testing',NULL),(103,'Testing1','Testing1',NULL),(104,'Testing1','Testing1',NULL),(105,'Testing1','Testing1',NULL),(106,'Testing1','Testing1',NULL),(107,'Testing1','Testing1',NULL),(108,'Testing1','Testing1',NULL),(109,'Testing1','Testing1',NULL),(110,'Testing2','Testing2',NULL),(111,'Testing3','Testing3',NULL),(112,'Testing4','Testing4',NULL);
/*!40000 ALTER TABLE `issue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue_category`
--

DROP TABLE IF EXISTS `issue_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `issue_category` (
  `category_id` int(11) NOT NULL,
  `issue_id` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `issue_id` (`issue_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `issue_category_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`),
  CONSTRAINT `issue_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue_category`
--

LOCK TABLES `issue_category` WRITE;
/*!40000 ALTER TABLE `issue_category` DISABLE KEYS */;
INSERT INTO `issue_category` VALUES (10,58,10),(10,59,11),(18,110,12);
/*!40000 ALTER TABLE `issue_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `performance`
--

DROP TABLE IF EXISTS `performance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `performance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `stance` varchar(256) NOT NULL,
  `timeTotal` int(11) NOT NULL DEFAULT '0',
  `debate_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  KEY `debate_id` (`debate_id`),
  CONSTRAINT `performance_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
  CONSTRAINT `performance_ibfk_3` FOREIGN KEY (`debate_id`) REFERENCES `debate` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `performance`
--

LOCK TABLES `performance` WRITE;
/*!40000 ALTER TABLE `performance` DISABLE KEYS */;
INSERT INTO `performance` VALUES (34,90,'Pro duck, anti horse',0,34),(35,91,'Go horses!!',0,34),(36,92,'TESTING',0,35),(37,92,'TESTING',0,35),(38,95,'test',0,38),(39,96,'Testing is great!',0,39);
/*!40000 ALTER TABLE `performance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `performance_member`
--

DROP TABLE IF EXISTS `performance_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `performance_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `performance_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` varchar(42) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `performance_id` (`performance_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `performance_member_ibfk_1` FOREIGN KEY (`performance_id`) REFERENCES `performance` (`id`),
  CONSTRAINT `performance_member_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `performance_member`
--

LOCK TABLES `performance_member` WRITE;
/*!40000 ALTER TABLE `performance_member` DISABLE KEYS */;
INSERT INTO `performance_member` VALUES (26,34,47,NULL),(27,35,45,NULL),(28,36,50,NULL),(29,37,50,NULL),(30,38,51,NULL),(31,39,51,NULL);
/*!40000 ALTER TABLE `performance_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rules`
--

DROP TABLE IF EXISTS `rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `args_per_turn` int(11) NOT NULL DEFAULT '1',
  `chars_per_arg` int(11) NOT NULL DEFAULT '256',
  `limit_seconds` int(11) NOT NULL DEFAULT '86165',
  `opening_statements` tinyint(1) NOT NULL DEFAULT '0',
  `references_on` tinyint(1) NOT NULL DEFAULT '0',
  `win_value` int(11) NOT NULL DEFAULT '100',
  `users_public_flag` tinyint(1) NOT NULL DEFAULT '0',
  `viewers_flag` tinyint(1) NOT NULL DEFAULT '0',
  `comments_view` tinyint(1) NOT NULL DEFAULT '0',
  `private_debate` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rules`
--

LOCK TABLES `rules` WRITE;
/*!40000 ALTER TABLE `rules` DISABLE KEYS */;
INSERT INTO `rules` VALUES (53,3,0,600,1,0,25,0,0,0,1),(54,0,0,0,0,0,0,0,0,0,0),(55,0,0,0,0,0,0,0,0,0,0),(56,0,0,0,0,0,0,0,0,0,0),(57,0,0,0,0,0,0,0,0,0,0),(58,2,4,0,0,0,0,0,0,0,0),(59,0,0,0,0,0,0,0,0,0,0),(60,0,0,0,0,0,0,0,0,0,0),(61,1,0,230400,0,0,25,0,0,0,0),(62,1,0,230400,0,0,25,0,0,0,0),(63,1,0,230400,0,0,25,0,0,0,0),(64,1,0,230400,0,0,25,0,0,0,0),(65,1,0,230400,0,0,25,0,0,0,0),(66,1,315,230400,0,0,25,0,0,0,0);
/*!40000 ALTER TABLE `rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(42) NOT NULL,
  `school` varchar(42) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (90,'Thundercats',NULL),(91,'InjusticeLeague',NULL),(92,'ADMIN',NULL),(93,'testteam1',NULL),(94,'testteam1',NULL),(95,'testt1',NULL),(96,'CounterReset',NULL);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_roster`
--

DROP TABLE IF EXISTS `team_roster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_roster` (
  `team_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`team_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `team_roster_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
  CONSTRAINT `team_roster_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_roster`
--

LOCK TABLES `team_roster` WRITE;
/*!40000 ALTER TABLE `team_roster` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_roster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(256) NOT NULL,
  `username` varchar(42) NOT NULL,
  `goodness` int(11) NOT NULL DEFAULT '5',
  `lawfulness` int(11) NOT NULL DEFAULT '5',
  `type` varchar(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (45,'$2a$10$jeRMFTHsB3XhKDtAwgJI4OTFdCRfWRWxoMw8LmErJoiTd0/10q3.y','testu5',0,0,'USER'),(46,'$2a$10$naIMD.7DvFNMy9JpRDzY7OySed9MKSr1tKE/xPzjRAQqUeur73VCS','testu6',0,0,'USER'),(47,'$2a$10$y9M30ixbYgQV2pf5b3Zuiexrel/VTg2SHzPhdvggD9gUK0snVE4Qe','testu7',5,5,'USER'),(48,'$2a$10$QmYPI../jvNaffhFfdqPweJPWyLdS3XTTQr2LXWPfPeInyHpT0RBW','testu8',5,5,'USER'),(49,'$2a$10$Jpwm7C6/LY6vwD.uHrrmm.u9w4ruH9kSw2PqHqIgzDzX5jXZD5UUa','testu10',5,5,'USER'),(50,'$2a$10$cH4ofUNOUuS2.98dFA/LW.kP8ydUYpkCGw7mEz2N07r3iyIzrXnWe','ADMINISTRATOR',5,5,'USER'),(51,'$2a$10$8uL7dG7yZ1Dc2UclVxZVDOuyt/zd1FbTKqB12ZfzNYrgKY7UEfoSS','CounterReset',5,5,'USER'),(52,'$2a$10$8oXRLR/6owhifS.r3AJEpOJvvn1AmSfHsghn/VJBbLgnnj5J22hz2','TestUser',5,5,'USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vote` (
  `user_id` int(11) NOT NULL,
  `debate_id` int(11) NOT NULL,
  `performance_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `debate_id` (`debate_id`),
  KEY `user_id` (`user_id`),
  KEY `performance_id` (`performance_id`),
  CONSTRAINT `vote_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `vote_ibfk_2` FOREIGN KEY (`debate_id`) REFERENCES `debate` (`id`),
  CONSTRAINT `vote_ibfk_3` FOREIGN KEY (`performance_id`) REFERENCES `performance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-22 18:10:55
