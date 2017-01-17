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
  `time_stamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` varchar(512) NOT NULL,
  `linkref` varchar(1012) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  KEY `user_id` (`user_id`),
  KEY `pm_id` (`pm_id`),
  CONSTRAINT `argument_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
  CONSTRAINT `argument_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `argument_ibfk_3` FOREIGN KEY (`pm_id`) REFERENCES `performance` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `argument`
--

LOCK TABLES `argument` WRITE;
/*!40000 ALTER TABLE `argument` DISABLE KEYS */;
INSERT INTO `argument` VALUES (2,1,1,1,'2017-01-12 15:33:39','testArg',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Music',NULL),(5,'Politics','The study of the activities associated with the governance of a country or other area'),(6,'Combat','Two men enter, one man leaves'),(7,'Society','Moderate and amend that social contract');
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
  `time_stamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` varchar(256) NOT NULL,
  `linkref` varchar(1012) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `debate_id` (`debate_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`debate_id`) REFERENCES `debate` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,1,'2017-01-12 16:28:20','testComment',NULL),(2,1,1,'2017-01-12 16:28:20','testComment2',NULL);
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
  `timeStamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `winner_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `issue_id` (`issue_id`),
  KEY `rules_id` (`rules_id`),
  KEY `winner_id` (`winner_id`),
  CONSTRAINT `debate_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`),
  CONSTRAINT `debate_ibfk_2` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`),
  CONSTRAINT `debate_ibfk_3` FOREIGN KEY (`rules_id`) REFERENCES `rules` (`id`),
  CONSTRAINT `debate_ibfk_4` FOREIGN KEY (`winner_id`) REFERENCES `performance` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debate`
--

LOCK TABLES `debate` WRITE;
/*!40000 ALTER TABLE `debate` DISABLE KEYS */;
INSERT INTO `debate` VALUES (1,1,1,'2017-01-12 14:44:36',NULL),(5,26,22,'2017-01-16 21:34:54',NULL),(6,27,23,'2017-01-17 08:25:04',NULL),(7,28,24,'2017-01-17 08:27:28',NULL),(8,29,25,'2017-01-17 08:28:33',NULL),(9,30,26,'2017-01-17 08:30:53',NULL),(10,31,27,'2017-01-17 08:34:05',NULL),(11,32,28,'2017-01-17 09:18:05',NULL),(12,33,29,'2017-01-17 09:22:47',NULL),(13,34,30,'2017-01-17 09:26:16',NULL),(14,35,31,'2017-01-17 09:29:57',NULL),(15,36,32,'2017-01-17 09:31:41',NULL),(16,37,33,'2017-01-17 09:43:33',NULL),(17,38,34,'2017-01-17 09:47:28',NULL),(18,39,35,'2017-01-17 09:49:22',NULL),(19,40,36,'2017-01-17 09:50:12',NULL),(20,41,37,'2017-01-17 09:53:13',NULL),(21,42,38,'2017-01-17 09:53:57',NULL),(22,43,39,'2017-01-17 11:27:31',NULL),(23,44,40,'2017-01-17 11:34:07',NULL),(24,45,41,'2017-01-17 11:35:10',NULL),(25,46,42,'2017-01-17 12:13:27',NULL),(26,47,43,'2017-01-17 12:21:37',NULL),(27,51,46,'2017-01-17 14:02:44',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue`
--

LOCK TABLES `issue` WRITE;
/*!40000 ALTER TABLE `issue` DISABLE KEYS */;
INSERT INTO `issue` VALUES (1,'Biggie vs Tupac',NULL,NULL),(5,'asdf','asdf','asdf'),(6,'asdfafsd','asdf','asdfadsf'),(7,'aaa','aaa','aaa'),(8,'asdf','asf','asdf'),(9,'asdf','asdf','adsfasdf'),(10,'qer','qwer','qwer'),(11,'yyy','sss','fff'),(12,'afaf','afafa','fafaf'),(13,'rrr','rrr','rrr'),(14,'fafadf','afdadfa','adfadfadf'),(15,'afaf','afaf','adsfafdaf'),(16,'asdfadsf','asdfasdf','asdfasdf'),(17,'afdadfadf','adfadfa','asdfasdfasdf'),(18,'mbnmnbm','vcvzv','zcxvzxcv'),(19,'asdfasdfa','asdfadsf','asdfasdf'),(20,'adfa','asdfad','asdfasd'),(21,'asdf','asdf','asdf'),(22,'qwerqewr','qewrqewr','qewrqwer'),(23,'rtrwtret','trwtr','wrt'),(24,'adsfa','adsfa','asdfa'),(25,'adsf','asdf','asdf'),(26,'t','t','t'),(27,'asdfa','asfaf','adsfadsfa'),(28,'asdf','asdf','adfs'),(29,'adfafd','adfadf','adfasdf'),(30,'zxcv','zxcv','zxcv'),(31,'zxcv','zxcv','zxvc'),(32,'zcxvzxc','zxcvz','zxcv'),(33,'zxcv','zcxv','zxcv'),(34,'asdf','asdf','asdf'),(35,'asdf','adsf','asdf'),(36,'asdfasdf','asdfasdf','asdfasdf'),(37,'asdf','asdf','asdf'),(38,'adf','asdf','adsf'),(39,'asdf','asdf','asdf'),(40,'asdf','asdf','asfd'),(41,'asdf','asdf','asdf'),(42,'asdf','asdf','asdf'),(43,'ddd','ddd','ddd'),(44,'adsf','asdf','asdf'),(45,'asdf','asdf','asdf'),(46,'Who is the greatest Beatle?','There can only be one',NULL),(47,'Nickelback vs Bieber','Which band makes Canada look worse?',NULL),(48,'Hendrix vs Mozart','Who had the bigger impact?',NULL),(49,'Mozart vs Hendrix','Who\'s best?',NULL),(50,'testing','test','test'),(51,'test2','test','test');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue_category`
--

LOCK TABLES `issue_category` WRITE;
/*!40000 ALTER TABLE `issue_category` DISABLE KEYS */;
INSERT INTO `issue_category` VALUES (1,51,1),(7,51,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `performance`
--

LOCK TABLES `performance` WRITE;
/*!40000 ALTER TABLE `performance` DISABLE KEYS */;
INSERT INTO `performance` VALUES (1,1,'Tupac > Biggie',0,1),(2,2,'Tupac < Biggie',0,1),(3,1,'Pro gun control',0,1),(4,2,'Anti gun control',0,1),(6,26,'big',0,1),(7,27,'big',0,1),(8,28,'big',0,1),(9,1,'stance',0,1),(15,68,'asdf',0,21),(16,69,'asdf',0,1),(17,70,'asdfasdf',0,22),(18,72,'asdfasdf',0,24),(19,73,'Paul and John are overrated',0,25),(20,74,'You love to hate em, unlike the biebs',0,26),(21,75,'asdfasdf',0,27),(22,77,'antitest',0,27);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `performance_member`
--

LOCK TABLES `performance_member` WRITE;
/*!40000 ALTER TABLE `performance_member` DISABLE KEYS */;
INSERT INTO `performance_member` VALUES (1,1,1,NULL),(2,2,3,NULL),(3,3,1,NULL),(6,1,3,NULL),(7,15,7,NULL),(8,16,7,NULL),(9,17,7,NULL),(10,18,7,NULL),(11,19,7,NULL),(12,20,7,NULL),(13,21,7,NULL),(14,22,7,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rules`
--

LOCK TABLES `rules` WRITE;
/*!40000 ALTER TABLE `rules` DISABLE KEYS */;
INSERT INTO `rules` VALUES (1,2,256,86165,0,0,100,0,0,0,1),(2,3,256,86165,0,0,100,0,0,0,1),(4,2,0,600,1,0,5,0,0,0,1),(5,3,0,300,1,1,500,1,0,0,1),(6,3,0,600,1,0,50,0,0,0,1),(7,2,0,600,1,1,10,1,0,0,1),(8,3,0,300,1,0,25,0,0,0,1),(9,2,0,300,1,0,10,0,0,0,1),(10,2,0,600,1,0,5,1,0,0,0),(11,4,0,600,1,0,10,0,0,0,0),(12,2,0,600,1,0,5,0,0,0,0),(13,2,0,900,0,1,10,0,0,0,0),(14,2,0,600,0,0,10,0,0,0,1),(15,2,0,300,1,0,5,0,0,0,0),(16,4,0,300,1,0,5,0,0,0,0),(17,2,0,300,1,0,10,0,0,0,0),(18,2,0,600,1,0,10,0,0,0,0),(19,3,0,300,1,0,10,0,0,0,0),(20,3,0,300,1,0,5,0,0,0,0),(21,2,0,1800,1,0,25,0,0,0,0),(22,3,0,600,1,0,10,0,0,0,0),(23,3,0,1800,1,0,25,0,0,0,0),(24,3,0,600,1,0,10,0,0,0,0),(25,3,0,600,1,0,25,0,0,0,0),(26,4,0,900,1,0,50,0,0,0,0),(27,1,0,600,1,0,10,0,0,0,0),(28,4,0,600,1,0,25,0,0,0,0),(29,2,0,1800,1,0,25,0,0,0,0),(30,2,0,1800,1,0,25,0,0,0,0),(31,2,0,600,1,0,10,0,0,0,0),(32,3,0,900,1,0,10,0,0,0,0),(33,4,0,300,1,0,10,0,0,0,0),(34,3,0,600,1,0,25,0,0,0,0),(35,3,0,600,1,0,10,0,0,0,0),(36,2,0,900,1,0,10,0,0,0,0),(37,4,0,300,1,0,25,0,0,0,0),(38,3,0,900,1,0,10,0,0,0,0),(39,2,0,900,1,0,10,0,0,0,0),(40,3,0,3600,1,0,10,0,0,0,0),(41,3,0,600,1,0,25,0,0,0,0),(42,3,0,1800,1,0,25,0,0,0,0),(43,3,0,600,1,0,10,0,0,0,0),(44,3,0,900,1,0,25,0,0,0,0),(45,4,0,900,1,0,50,0,0,0,0),(46,3,0,600,1,0,10,0,0,0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'testTeam1',NULL),(2,'testTeam2',NULL),(4,'testu5',NULL),(5,'testu5',NULL),(6,'testu5',NULL),(7,'testu5',NULL),(8,'testu5',NULL),(9,'testu5',NULL),(10,'testu5',NULL),(11,'testu5',NULL),(12,'testu5',NULL),(13,'testu5',NULL),(14,'testu5',NULL),(15,'team3',NULL),(16,'team3',NULL),(17,'testteam',NULL),(18,'test',NULL),(19,'testu5',NULL),(20,'testu5',NULL),(21,'testu5',NULL),(22,'testu5',NULL),(23,'testu5',NULL),(24,'testu5',NULL),(25,'testu5',NULL),(26,'',NULL),(27,'',NULL),(28,'',NULL),(29,'',NULL),(30,'',NULL),(31,'testu5',NULL),(32,'testu5',NULL),(33,'testu5',NULL),(34,'testu5',NULL),(35,'testu5',NULL),(36,'tea',NULL),(37,'newteam',NULL),(38,'tea',NULL),(39,'asdfasdf',NULL),(40,'asdfasdfadsf',NULL),(41,'uyjethth',NULL),(42,'asdfafasdfasdf',NULL),(43,'asdfadsf',NULL),(44,'adfa',NULL),(45,'asdfadsf',NULL),(46,'adsf',NULL),(47,'fda',NULL),(48,'adfasdf',NULL),(49,'eqrewr',NULL),(50,'ghdgh',NULL),(51,'adsfadsf',NULL),(52,'adsf',NULL),(53,'asdfa',NULL),(54,'adsf',NULL),(55,'asdf',NULL),(56,'zxcv',NULL),(57,'zxcv',NULL),(58,'zxcv',NULL),(59,'asdf',NULL),(60,'asf',NULL),(61,'asdf',NULL),(62,'asdf',NULL),(63,'asdfasdf',NULL),(64,'asdf',NULL),(65,'adf',NULL),(66,'asdf',NULL),(67,'asdf',NULL),(68,'asf',NULL),(69,'testu5asdfa',NULL),(70,'asdfadf',NULL),(71,'asf',NULL),(72,'asdf',NULL),(73,'Team Ringo',NULL),(74,'Team Nickelback',NULL),(75,'MyTEam',NULL),(76,'testu5',NULL),(77,'testu5',NULL);
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
INSERT INTO `team_roster` VALUES (1,1),(2,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'testpass','testu1',5,5,'USER'),(3,'testpass','testu2',5,5,'USER'),(5,'testpass','DeactAcct',5,5,'DEACT'),(6,'$2a$10$1rtTjP93BdvZN4leRuFgIOmQZRzG.4d.ET/ztqSrN2Zm29oQf0ejO','TestSignup',5,5,'DEACT'),(7,'$2a$10$BVJzwQG8SgOvws14/ZUspOn5MB6pFtp/uX/HWguSFeyllE3aRLuMS','testu5',0,0,'USER'),(8,'$2a$10$JIgfFfRX2jeZfVcYNzSiAOU0m8uFp.1/j8o32VJg0Cm.YcRJDxS7.','testu6',0,0,'USER'),(9,'$2a$10$c9.649bD4orKUdKMXw/sjOz4BJIBK8JqnMy/.xN20uyKkcVBCg3Z2','testu7',0,0,'USER'),(10,'$2a$10$a1DGJSGDAYBv6LdNzu2oKOgTHIFFaZaJQp0d0II6Zetc9g4Wp1CC2','testu8',0,0,'USER'),(11,'$2a$10$auJpPoYUoHWO799l.5tS1ej3oiokzjt81.mZ/RHMUN233dDj4LyxK','testing1',0,0,'USER'),(12,'test','test',5,5,'test');
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
  `time_stamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `debate_id` (`debate_id`),
  KEY `user_id` (`user_id`),
  KEY `performance_id` (`performance_id`),
  CONSTRAINT `vote_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `vote_ibfk_2` FOREIGN KEY (`debate_id`) REFERENCES `debate` (`id`),
  CONSTRAINT `vote_ibfk_3` FOREIGN KEY (`performance_id`) REFERENCES `performance` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES (3,1,1,1,'2017-01-12 17:23:18');
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

-- Dump completed on 2017-01-17 15:53:04
