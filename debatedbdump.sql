-- MySQL dump 10.13  Distrib 5.6.33, for osx10.9 (x86_64)
--
-- Host: localhost    Database: debaterdb
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
  `user_id` int(11) NOT NULL,
  `debate_id` int(11) NOT NULL,
  `text` varchar(256) DEFAULT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `linkref` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `debate_id` (`debate_id`),
  CONSTRAINT `argument_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `argument_ibfk_2` FOREIGN KEY (`debate_id`) REFERENCES `debate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `argument`
--

LOCK TABLES `argument` WRITE;
/*!40000 ALTER TABLE `argument` DISABLE KEYS */;
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
  `name` varchar(124) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
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
  `text` varchar(256) DEFAULT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `linkref` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `debate_id` (`debate_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`debate_id`) REFERENCES `debate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
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
  `topic` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `stance1` varchar(256) NOT NULL,
  `stance2` varchar(256) NOT NULL,
  `rules_id` int(11) NOT NULL,
  `result_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `topic` (`topic`),
  KEY `rules_id` (`rules_id`),
  KEY `result_id` (`result_id`),
  CONSTRAINT `debate_ibfk_3` FOREIGN KEY (`topic`) REFERENCES `topic` (`id`),
  CONSTRAINT `debate_ibfk_4` FOREIGN KEY (`rules_id`) REFERENCES `rules` (`id`),
  CONSTRAINT `debate_ibfk_5` FOREIGN KEY (`result_id`) REFERENCES `result` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debate`
--

LOCK TABLES `debate` WRITE;
/*!40000 ALTER TABLE `debate` DISABLE KEYS */;
/*!40000 ALTER TABLE `debate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result`
--

DROP TABLE IF EXISTS `result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `result` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team1id` int(11) NOT NULL,
  `team2id` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  `side1time` int(11) NOT NULL,
  `side2time` int(11) DEFAULT NULL,
  `points1` int(11) NOT NULL DEFAULT '0',
  `points2` int(11) NOT NULL DEFAULT '0',
  `winteam` int(11) NOT NULL,
  `loseteam` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team1id` (`team1id`),
  KEY `team2id` (`team2id`),
  KEY `winteam` (`winteam`),
  KEY `loseteam` (`loseteam`),
  CONSTRAINT `result_ibfk_1` FOREIGN KEY (`team1id`) REFERENCES `team` (`id`),
  CONSTRAINT `result_ibfk_2` FOREIGN KEY (`team2id`) REFERENCES `team` (`id`),
  CONSTRAINT `result_ibfk_3` FOREIGN KEY (`winteam`) REFERENCES `team` (`id`),
  CONSTRAINT `result_ibfk_4` FOREIGN KEY (`loseteam`) REFERENCES `team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result`
--

LOCK TABLES `result` WRITE;
/*!40000 ALTER TABLE `result` DISABLE KEYS */;
/*!40000 ALTER TABLE `result` ENABLE KEYS */;
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
  `private_debate` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rules`
--

LOCK TABLES `rules` WRITE;
/*!40000 ALTER TABLE `rules` DISABLE KEYS */;
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
  `name` varchar(48) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_debate`
--

DROP TABLE IF EXISTS `team_debate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_debate` (
  `team_id` int(11) NOT NULL,
  `debate_id` int(11) NOT NULL,
  PRIMARY KEY (`team_id`,`debate_id`),
  KEY `debate_id` (`debate_id`),
  CONSTRAINT `team_debate_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
  CONSTRAINT `team_debate_ibfk_2` FOREIGN KEY (`debate_id`) REFERENCES `debate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_debate`
--

LOCK TABLES `team_debate` WRITE;
/*!40000 ALTER TABLE `team_debate` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_debate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(124) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
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
  `goodness` int(11) DEFAULT '0',
  `lawfulness` int(11) DEFAULT '0',
  `type` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_team`
--

DROP TABLE IF EXISTS `user_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_team` (
  `user_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`team_id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `user_team_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_team_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_team`
--

LOCK TABLES `user_team` WRITE;
/*!40000 ALTER TABLE `user_team` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_team` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-10 12:17:06
