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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `argument`
--

LOCK TABLES `argument` WRITE;
/*!40000 ALTER TABLE `argument` DISABLE KEYS */;
INSERT INTO `argument` VALUES (2,1,1,1,'2017-01-12 15:33:39','testArg',NULL),(4,79,13,16,'2017-01-18 11:14:22','this is a new argument',''),(5,79,13,16,'2017-01-18 11:14:52','this is also a new argument','http://xkcd.com/'),(6,79,7,16,'2017-01-19 13:39:18','adsfasdfads',''),(7,79,7,16,'2017-01-19 13:39:44','another new arg',NULL),(8,79,7,16,'2017-01-19 14:03:43','thisasdfasfadsfdffdadfadf    asdfa',''),(9,80,7,17,'2017-01-19 14:25:18','adsfadsfdafdsfadfdaf',''),(10,80,7,17,'2017-01-19 14:28:00','afadsfadf',''),(11,80,7,17,'2017-01-19 14:33:06','this is a new comment and it will work, damnit',''),(12,80,7,17,'2017-01-19 14:33:12','khgvhgvkhjbkghv',NULL),(13,80,7,17,'2017-01-19 14:42:52','dhfgddfhg',NULL),(14,80,7,17,'2017-01-19 14:42:56','jjkhjhgjkhkljhljkh',NULL),(15,80,7,17,'2017-01-19 14:43:12','gdghfkhf',NULL),(16,85,7,22,'2017-01-19 16:16:55','adfadfafafadf',''),(17,85,7,22,'2017-01-19 16:17:11','asdfadfafaf',NULL),(18,86,34,23,'2017-01-19 16:17:11','sdfsdf',''),(19,85,7,22,'2017-01-19 16:17:20','hey there',NULL),(20,85,7,22,'2017-01-19 16:17:30','help, im trapped in a debate factory',NULL),(21,86,34,23,'2017-01-19 16:17:39','What side am I arguing now?',NULL),(22,85,7,22,'2017-01-19 16:17:55','team jacob. I called team edward',NULL),(23,86,34,23,'2017-01-19 16:33:48','this',''),(24,89,35,25,'2017-01-20 10:45:13','Gorillas have hands',''),(25,87,7,24,'2017-01-20 10:45:33','Polar bears are bigger, plus the environment advantage',''),(26,89,35,25,'2017-01-20 10:46:59','But if I change the way I spell gorilla, it is guerilla. and now I shoot you.',''),(27,87,7,24,'2017-01-20 10:47:09','good point, I concede',NULL);
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
  `time_stamp` datetime NOT NULL DEFAULT GETDATE(),
  `text` varchar(256) NOT NULL,
  `linkref` varchar(1012) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `debate_id` (`debate_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`debate_id`) REFERENCES `debate` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,1,'2017-01-12 16:28:20','testComment',NULL),(2,1,1,'2017-01-12 16:28:20','testComment2',NULL),(4,13,29,'2017-01-18 11:24:50','this is a new comment',''),(5,13,29,'2017-01-18 11:25:16','this is also a new comment','http://xkcd.com/'),(6,13,29,'2017-01-18 11:26:37','heloooooooo',NULL),(7,13,29,'2017-01-18 13:14:15','this is a new comment',''),(8,13,29,'2017-01-18 14:08:21','asdfadsfadfadsf',''),(9,13,29,'2017-01-18 14:12:40','this is a comment holmes',''),(10,14,29,'2017-01-18 15:11:49','this is a comment',''),(11,14,29,'2017-01-18 15:13:29','adfafafafafaafaafaffa','asdfasdfadf'),(12,14,29,'2017-01-18 17:34:30','asdfadsfaf',''),(13,14,29,'2017-01-18 17:55:31','this is a new comment',''),(14,14,30,'2017-01-18 18:06:09','commmmeeeeennnnnttt',''),(15,14,30,'2017-01-18 18:20:25','gfhfj',NULL),(16,14,30,'2017-01-19 10:45:21','comment',''),(17,14,29,'2017-01-19 15:14:23','r u wrking comment box????',''),(18,14,29,'2017-01-19 15:14:28','damn right you are',NULL),(19,33,28,'2017-01-19 15:41:31','yo',''),(20,33,31,'2017-01-19 15:41:39','asdfadsfasdfasdfasdf',''),(21,14,32,'2017-01-19 16:22:40','hey do you see this comment?',''),(22,14,32,'2017-01-19 16:23:04','how bout now?',NULL),(23,14,32,'2017-01-19 16:23:46','hhhhhhhhh',NULL),(24,14,32,'2017-01-19 17:10:45','suuuuup',''),(25,37,33,'2017-01-20 10:43:17','I\'m here',''),(26,38,1,'2017-01-20 10:43:58','tupac was a poet',''),(27,39,33,'2017-01-20 10:44:52','Gorilas no Questions',''),(28,40,33,'2017-01-20 10:44:53','really you\'d only need one gorilla',''),(29,37,33,'2017-01-20 10:45:11','Polar bears win',NULL),(30,40,33,'2017-01-20 10:45:19','No way dude',NULL),(31,39,33,'2017-01-20 10:45:47','Gorillas are communal creatures, their teamwork is undeniable',NULL),(32,36,33,'2017-01-20 10:46:26','Polar bear would win by sheer size and strength',''),(33,40,33,'2017-01-20 10:46:26','Polar bears are less maneuverable',NULL),(34,37,33,'2017-01-20 10:46:40','Yes that is true @Brianipock',NULL),(35,42,33,'2017-01-20 10:46:59','Go POLARS!!!!!',''),(36,40,33,'2017-01-20 10:47:00','plus waaaay less intelligent or resourceful, kind of like testu5',NULL),(37,39,33,'2017-01-20 10:47:15','there are no polar bears in Hawaii',NULL),(38,37,33,'2017-01-20 10:48:03','There are! In the form of pigs.. they taste great too!',NULL),(39,42,33,'2017-01-20 10:48:34','WHY CAN\'T GORILLAS AND POLARS GET ALONG!?!?!?',''),(40,42,33,'2017-01-20 10:49:00','<script>window.location.href = \"http://google.com\"</script>',NULL),(41,40,33,'2017-01-20 10:49:15','DROP table arguments;',NULL),(42,44,33,'2017-01-20 11:05:38','asfsaf','');
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
  `turn_count` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `issue_id` (`issue_id`),
  KEY `rules_id` (`rules_id`),
  KEY `winner_id` (`winner_id`),
  CONSTRAINT `debate_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`),
  CONSTRAINT `debate_ibfk_2` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`),
  CONSTRAINT `debate_ibfk_3` FOREIGN KEY (`rules_id`) REFERENCES `rules` (`id`),
  CONSTRAINT `debate_ibfk_4` FOREIGN KEY (`winner_id`) REFERENCES `performance` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debate`
--

LOCK TABLES `debate` WRITE;
/*!40000 ALTER TABLE `debate` DISABLE KEYS */;
INSERT INTO `debate` VALUES (1,1,1,'2017-01-12 14:44:36',NULL,1),(5,26,22,'2017-01-16 21:34:54',NULL,0),(6,27,23,'2017-01-17 08:25:04',NULL,0),(7,28,24,'2017-01-17 08:27:28',NULL,0),(8,29,25,'2017-01-17 08:28:33',NULL,0),(9,30,26,'2017-01-17 08:30:53',NULL,0),(10,31,27,'2017-01-17 08:34:05',NULL,1),(11,32,28,'2017-01-17 09:18:05',NULL,0),(12,33,29,'2017-01-17 09:22:47',NULL,0),(13,34,30,'2017-01-17 09:26:16',NULL,0),(14,35,31,'2017-01-17 09:29:57',NULL,0),(15,36,32,'2017-01-17 09:31:41',NULL,0),(16,37,33,'2017-01-17 09:43:33',NULL,0),(17,38,34,'2017-01-17 09:47:28',NULL,0),(18,39,35,'2017-01-17 09:49:22',NULL,0),(19,40,36,'2017-01-17 09:50:12',NULL,0),(20,41,37,'2017-01-17 09:53:13',NULL,0),(21,42,38,'2017-01-17 09:53:57',NULL,0),(22,43,39,'2017-01-17 11:27:31',NULL,0),(23,44,40,'2017-01-17 11:34:07',NULL,0),(24,45,41,'2017-01-17 11:35:10',NULL,0),(25,46,42,'2017-01-17 12:13:27',NULL,1),(26,47,43,'2017-01-17 12:21:37',NULL,1),(27,51,46,'2017-01-17 14:02:44',NULL,0),(28,52,47,'2017-01-17 16:03:34',NULL,1),(29,53,48,'2017-01-17 16:04:33',NULL,1),(30,54,49,'2017-01-18 09:57:45',NULL,5),(31,55,50,'2017-01-18 13:24:22',NULL,1),(32,56,51,'2017-01-19 16:14:16',NULL,1),(33,57,52,'2017-01-20 09:54:48',NULL,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue`
--

LOCK TABLES `issue` WRITE;
/*!40000 ALTER TABLE `issue` DISABLE KEYS */;
INSERT INTO `issue` VALUES (1,'Biggie vs Tupac',NULL,NULL),(5,'asdf','asdf','asdf'),(6,'asdfafsd','asdf','asdfadsf'),(7,'aaa','aaa','aaa'),(8,'asdf','asf','asdf'),(9,'asdf','asdf','adsfasdf'),(10,'qer','qwer','qwer'),(11,'yyy','sss','fff'),(12,'afaf','afafa','fafaf'),(13,'rrr','rrr','rrr'),(14,'fafadf','afdadfa','adfadfadf'),(15,'afaf','afaf','adsfafdaf'),(16,'asdfadsf','asdfasdf','asdfasdf'),(17,'afdadfadf','adfadfa','asdfasdfasdf'),(18,'mbnmnbm','vcvzv','zcxvzxcv'),(19,'asdfasdfa','asdfadsf','asdfasdf'),(20,'adfa','asdfad','asdfasd'),(21,'asdf','asdf','asdf'),(22,'qwerqewr','qewrqewr','qewrqwer'),(23,'rtrwtret','trwtr','wrt'),(24,'adsfa','adsfa','asdfa'),(25,'adsf','asdf','asdf'),(26,'t','t','t'),(27,'asdfa','asfaf','adsfadsfa'),(28,'asdf','asdf','adfs'),(29,'adfafd','adfadf','adfasdf'),(30,'zxcv','zxcv','zxcv'),(31,'zxcv','zxcv','zxvc'),(32,'zcxvzxc','zxcvz','zxcv'),(33,'zxcv','zcxv','zxcv'),(34,'asdf','asdf','asdf'),(35,'asdf','adsf','asdf'),(36,'asdfasdf','asdfasdf','asdfasdf'),(37,'asdf','asdf','asdf'),(38,'adf','asdf','adsf'),(39,'asdf','asdf','asdf'),(40,'asdf','asdf','asfd'),(41,'asdf','asdf','asdf'),(42,'asdf','asdf','asdf'),(43,'ddd','ddd','ddd'),(44,'adsf','asdf','asdf'),(45,'asdf','asdf','asdf'),(46,'Who is the greatest Beatle?','There can only be one',NULL),(47,'Nickelback vs Bieber','Which band makes Canada look worse?',NULL),(48,'Hendrix vs Mozart','Who had the bigger impact?',NULL),(49,'Mozart vs Hendrix','Who\'s best?',NULL),(50,'testing','test','test'),(51,'test2','test','test'),(52,'Star Wars vs Star Trek','Star Trek. No contest.',NULL),(53,'Jedi vs Sith','Who has the coolest powers?',NULL),(54,'Legalize loitering','Should we be allowed to just exist, or should there be limits to where we can exist?',NULL),(55,'CSS vs Javascript','Which is best for inducing homicidal mania?',NULL),(56,'TwoPlayerTest','Two Player Enter',NULL),(57,'One Polar Bear vs Two Gorillas','Silverbacks vs polar bear, in the snow. Last one standing wins.',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue_category`
--

LOCK TABLES `issue_category` WRITE;
/*!40000 ALTER TABLE `issue_category` DISABLE KEYS */;
INSERT INTO `issue_category` VALUES (1,51,1),(7,51,2),(7,52,3),(7,53,4),(6,53,5),(7,54,6),(6,55,7),(7,56,8),(6,57,9);
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `performance`
--

LOCK TABLES `performance` WRITE;
/*!40000 ALTER TABLE `performance` DISABLE KEYS */;
INSERT INTO `performance` VALUES (1,1,'Tupac > Biggie',0,1),(2,2,'Tupac < Biggie',0,1),(3,1,'Pro gun control',0,1),(4,2,'Anti gun control',0,1),(6,26,'big',0,1),(7,27,'big',0,1),(8,28,'big',0,1),(9,1,'stance',0,1),(15,68,'asdf',0,21),(16,69,'asdf',0,1),(17,70,'asdfasdf',0,22),(18,72,'asdfasdf',0,24),(19,73,'Paul and John are overrated',0,25),(20,74,'You love to hate em, unlike the biebs',0,26),(21,75,'asdfasdf',0,27),(22,77,'antitest',0,27),(23,78,'Pro Star Trek',0,28),(24,79,'Let the hate flow through you',0,29),(25,80,'Anti loitering. Get the hell off my lawn.',0,30),(26,81,'I\'ll go where I damn well please',0,30),(27,82,'Javascript wants to be your friend. CSS wants to sell you to Burmese sex traders.',0,31),(28,83,'adsfadsf',0,10),(29,84,'',0,10),(30,85,'Vampires and stuff',0,32),(31,86,'please work?',0,32),(32,87,'The most dangerous bear on the planet, in its natural environment? No contest.',0,33),(33,89,'I thought it said guerrilla',0,33);
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `performance_member`
--

LOCK TABLES `performance_member` WRITE;
/*!40000 ALTER TABLE `performance_member` DISABLE KEYS */;
INSERT INTO `performance_member` VALUES (1,1,1,NULL),(2,2,3,NULL),(3,3,1,NULL),(6,1,3,NULL),(7,15,7,NULL),(8,16,7,NULL),(9,17,7,NULL),(10,18,7,NULL),(11,19,7,NULL),(12,20,7,NULL),(13,21,7,NULL),(14,22,7,NULL),(15,23,7,NULL),(16,24,7,NULL),(17,25,7,NULL),(18,26,13,NULL),(19,27,7,NULL),(20,28,13,NULL),(21,29,13,NULL),(22,30,7,NULL),(23,31,34,NULL),(24,32,7,NULL),(25,33,35,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rules`
--

LOCK TABLES `rules` WRITE;
/*!40000 ALTER TABLE `rules` DISABLE KEYS */;
INSERT INTO `rules` VALUES (1,2,256,86165,0,0,100,0,0,0,1),(2,3,256,86165,0,0,100,0,0,0,1),(4,2,0,600,1,0,5,0,0,0,1),(5,3,0,300,1,1,500,1,0,0,1),(6,3,0,600,1,0,50,0,0,0,1),(7,2,0,600,1,1,10,1,0,0,1),(8,3,0,300,1,0,25,0,0,0,1),(9,2,0,300,1,0,10,0,0,0,1),(10,2,0,600,1,0,5,1,0,0,0),(11,4,0,600,1,0,10,0,0,0,0),(12,2,0,600,1,0,5,0,0,0,0),(13,2,0,900,0,1,10,0,0,0,0),(14,2,0,600,0,0,10,0,0,0,1),(15,2,0,300,1,0,5,0,0,0,0),(16,4,0,300,1,0,5,0,0,0,0),(17,2,0,300,1,0,10,0,0,0,0),(18,2,0,600,1,0,10,0,0,0,0),(19,3,0,300,1,0,10,0,0,0,0),(20,3,0,300,1,0,5,0,0,0,0),(21,2,0,1800,1,0,25,0,0,0,0),(22,3,0,600,1,0,10,0,0,0,0),(23,3,0,1800,1,0,25,0,0,0,0),(24,3,0,600,1,0,10,0,0,0,0),(25,3,0,600,1,0,25,0,0,0,0),(26,4,0,900,1,0,50,0,0,0,0),(27,1,0,600,1,0,10,0,0,0,0),(28,4,0,600,1,0,25,0,0,0,0),(29,2,0,1800,1,0,25,0,0,0,0),(30,2,0,1800,1,0,25,0,0,0,0),(31,2,0,600,1,0,10,0,0,0,0),(32,3,0,900,1,0,10,0,0,0,0),(33,4,0,300,1,0,10,0,0,0,0),(34,3,0,600,1,0,25,0,0,0,0),(35,3,0,600,1,0,10,0,0,0,0),(36,2,0,900,1,0,10,0,0,0,0),(37,4,0,300,1,0,25,0,0,0,0),(38,3,0,900,1,0,10,0,0,0,0),(39,2,0,900,1,0,10,0,0,0,0),(40,3,0,3600,1,0,10,0,0,0,0),(41,3,0,600,1,0,25,0,0,0,0),(42,3,0,1800,1,0,25,0,0,0,0),(43,3,0,600,1,0,10,0,0,0,0),(44,3,0,900,1,0,25,0,0,0,0),(45,4,0,900,1,0,50,0,0,0,0),(46,3,0,600,1,0,10,0,0,0,0),(47,3,0,600,1,0,5,0,0,0,0),(48,3,0,900,1,0,25,0,0,0,0),(49,4,0,900,0,1,25,0,0,0,0),(50,4,0,900,0,1,25,0,0,0,0),(51,4,0,1800,1,0,25,0,0,0,0),(52,3,0,900,1,0,25,0,0,0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'testTeam1',NULL),(2,'testTeam2',NULL),(4,'testu5',NULL),(5,'testu5',NULL),(6,'testu5',NULL),(7,'testu5',NULL),(8,'testu5',NULL),(9,'testu5',NULL),(10,'testu5',NULL),(11,'testu5',NULL),(12,'testu5',NULL),(13,'testu5',NULL),(14,'testu5',NULL),(15,'team3',NULL),(16,'team3',NULL),(17,'testteam',NULL),(18,'test',NULL),(19,'testu5',NULL),(20,'testu5',NULL),(21,'testu5',NULL),(22,'testu5',NULL),(23,'testu5',NULL),(24,'testu5',NULL),(25,'testu5',NULL),(26,'',NULL),(27,'',NULL),(28,'',NULL),(29,'',NULL),(30,'',NULL),(31,'testu5',NULL),(32,'testu5',NULL),(33,'testu5',NULL),(34,'testu5',NULL),(35,'testu5',NULL),(36,'tea',NULL),(37,'newteam',NULL),(38,'tea',NULL),(39,'asdfasdf',NULL),(40,'asdfasdfadsf',NULL),(41,'uyjethth',NULL),(42,'asdfafasdfasdf',NULL),(43,'asdfadsf',NULL),(44,'adfa',NULL),(45,'asdfadsf',NULL),(46,'adsf',NULL),(47,'fda',NULL),(48,'adfasdf',NULL),(49,'eqrewr',NULL),(50,'ghdgh',NULL),(51,'adsfadsf',NULL),(52,'adsf',NULL),(53,'asdfa',NULL),(54,'adsf',NULL),(55,'asdf',NULL),(56,'zxcv',NULL),(57,'zxcv',NULL),(58,'zxcv',NULL),(59,'asdf',NULL),(60,'asf',NULL),(61,'asdf',NULL),(62,'asdf',NULL),(63,'asdfasdf',NULL),(64,'asdf',NULL),(65,'adf',NULL),(66,'asdf',NULL),(67,'asdf',NULL),(68,'asf',NULL),(69,'testu5asdfa',NULL),(70,'asdfadf',NULL),(71,'asf',NULL),(72,'asdf',NULL),(73,'Team Ringo',NULL),(74,'Team Nickelback',NULL),(75,'MyTEam',NULL),(76,'testu5',NULL),(77,'testu5',NULL),(78,'Voyager1',NULL),(79,'Sith',NULL),(80,'An old guy on his porch',NULL),(81,'Team Chillin',NULL),(82,'Team CSS',NULL),(83,'testu9',NULL),(84,'testu9',NULL),(85,'Team Edward',NULL),(86,'ANALBUMCOVERS',NULL),(87,'Team Polar Bear',NULL),(88,'Team Guerrilla',NULL),(89,'Team guerrilla',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'testpass','testu1',5,5,'USER'),(3,'testpass','testu2',5,5,'USER'),(5,'testpass','DeactAcct',5,5,'DEACT'),(6,'$2a$10$1rtTjP93BdvZN4leRuFgIOmQZRzG.4d.ET/ztqSrN2Zm29oQf0ejO','TestSignup',5,5,'DEACT'),(7,'$2a$10$BVJzwQG8SgOvws14/ZUspOn5MB6pFtp/uX/HWguSFeyllE3aRLuMS','testu5',0,0,'USER'),(8,'$2a$10$JIgfFfRX2jeZfVcYNzSiAOU0m8uFp.1/j8o32VJg0Cm.YcRJDxS7.','testu6',0,0,'USER'),(9,'$2a$10$c9.649bD4orKUdKMXw/sjOz4BJIBK8JqnMy/.xN20uyKkcVBCg3Z2','testu7',0,0,'USER'),(10,'$2a$10$a1DGJSGDAYBv6LdNzu2oKOgTHIFFaZaJQp0d0II6Zetc9g4Wp1CC2','testu8',0,0,'USER'),(11,'$2a$10$auJpPoYUoHWO799l.5tS1ej3oiokzjt81.mZ/RHMUN233dDj4LyxK','testing1',0,0,'USER'),(12,'test','test',5,5,'test'),(13,'$2a$10$pPCWDPJJSQ5pyVzId5kJwOXDybXC6015MwXb3yrBVnghbCTPpNHWS','testu9',0,0,'USER'),(14,'$2a$10$ZbJj8TUZVBUqa92e/2hkqOlE6CDonEs/0KxmIGLhRzLnTu9cJfUMC','testu99',0,0,'USER'),(15,'$2a$10$SLlsUjeYhNqcx7VRGNlkUeURIY4yN.BWJheYWmM4E0gDhDOJCtHfi','testu98',0,0,'USER'),(16,'$2a$10$pRkfLeV6DESQnQgLua9IGeafuaDZq4iCr2E3hQeZYTOd37EBAVWr6','testu97',0,0,'USER'),(17,'$2a$10$HhAegS6h/LatHo5MsFdikuxQY7YBQsA1.lPfFlsYMjNmpL9s47rey','testu96',0,0,'USER'),(18,'$2a$10$Pif2WY9HSeKalCKgpo1HWu8IS3AsiYAok69uKPx3d39nPIybZBFp2','testu96',0,0,'USER'),(19,'$2a$10$Jb.vtyRkOYic1JOI2Bxv/Omzcb6EbzpnBD35q4zBfMuk4ximAxrrC','newtest1',0,0,'USER'),(20,'$2a$10$cfAH03gz2Uw0frJP9n99/OzQYFJIisnhR8e3im3/q3hOxDoYMORim','newtest2',0,0,'USER'),(21,'$2a$10$cg7YFySUC6ME8pLNGuAXlOQQu3r.2RPxqFOoTGbGfrQklqvS3bGwu','newtest4',0,0,'USER'),(22,'$2a$10$XQSY5fUxcn.bcR.NH6DO3uvG/c1ZnDvCbufC0YylsPmfN9gTMQ6bq','newtest5',0,0,'USER'),(23,'$2a$10$SzwhP.ylIIu/FefKcLfV9.qlxeJ7FWLqgk8x61mHCW/NCB2tHmMcy','newtest6',0,0,'USER'),(24,'$2a$10$P6aOdsTWsToIZ.MXjXDcku1EZkUn4w52elM304phirjIWyu357vOO','newtest8',0,0,'USER'),(25,'$2a$10$W8gw3GZo2UXH4nBimBvt/eOwnzdfDrvz39Vdm.OPepK3ZtFwmxE8C','newtest10',0,0,'USER'),(26,'$2a$10$YsX1T9/9qQpz3ewIFesvwOJJOpaxxBJZ4XMpxngE25l1KWFvdj42q','newtest11',0,0,'USER'),(27,'$2a$10$CzAc3VFRzMZNHehsA2X05ewc7jGQyHIjkGmO7TDFjFxk5qRPMg3SW','newtest12',0,0,'USER'),(28,'$2a$10$A7Cllykz.I6WnHUOFL4nBeUj98/rQ3Fu1sjrKZDNR8lPvNTzXvZPm','newtest13',0,0,'USER'),(29,'$2a$10$WaBB04nxdifwD7RV0TCwWONea4mASGkuWF1E3HFMPnVPcpAACNQZ.','newtest14',0,0,'USER'),(30,'$2a$10$RRLwFvn4SQbEOBkgSVksvuzqM0OInRAI8RmN9cIV8DKsd42atc5Nu','newtest15',0,0,'USER'),(31,'$2a$10$w2XwvmNslJjahr20x3ny6upXE8rN1Pr8GGS.o0c3oFxgDRtnkiDRW','newtest16',0,0,'USER'),(32,'$2a$10$vVef1Wmrm88qb29spiAmBeJRM9tsdr/FdzmR6Qe28mvT5u4FxDa3a','newtest16',0,0,'USER'),(33,'$2a$10$rDnfzAcao3bcmNb9aZBYguRHLr3zNcz6B/uWXkXranTIUf7zduoMG','newuser19',0,0,'USER'),(34,'$2a$10$IruuZKsB88XUcA9Szw/7geXPJnLIcLx2r12vujuHTS5B3dhMM6GPu','tester1',0,0,'USER'),(35,'$2a$10$v2op9pc/xxjS9IDUifTqYOW1sSkCAl7AnPOL2vWOX9fL.54ovGO5W','tester1',0,0,'USER'),(36,'$2a$10$gmNb1b9yoNdB5Aq9YXzFMeBgby40m.p2lUZZD7qT/ihTVeAlTD7om','IsThisNamePermanent',0,0,'USER'),(37,'$2a$10$LN0eTA4ZFUHn0Pg.3abhDOgdGACnvOWf9aN5zd1IRq40PH.1c3de2','Keala808',0,0,'USER'),(38,'$2a$10$ahnbpetfzQrI0Q7xABFumO7aHLE1.xD.dY.998cJSrUI4vlK/Bc9y','sarahp',0,0,'USER'),(39,'$2a$10$wDs/Jyrt3MvD.SxNY19yGuZWo.g6dV1yRuGITqGamSFXCmXmatH/i','Brianipock',0,0,'USER'),(40,'$2a$10$jEq2VDvrYvz8WpgRQ/UXAuzJ3fovBrPB1Zs7AF7i9.mqsn1GUurJG','jbone1',0,0,'USER'),(41,'$2a$10$2yE5XZrYkebIVVHvT1Gu9.TdkRD87kzPGtGspUj2u8Lvnj3f6MT3m','chazlegrand',0,0,'USER'),(42,'$2a$10$BD3hMuPhecweEPlhzZ1W/enM2tIWGAwniaR4JutD6VamiTcgNukry','Topher',0,0,'USER'),(43,'$2a$10$KfzHVNqkWQdlEeUQuclneukRBsmIQEAfY9EpCUcDAk6xxIiHOTPrS','FrockU',0,0,'USER'),(44,'$2a$10$f8oUiGi8qaTQGxIB61vtXeMwu8erjDspDJNwDWHfT9i4SO0d.daWy','andrew',0,0,'USER');
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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES (3,1,1,1,'2017-01-12 17:23:18'),(7,5,1,3,'2017-01-18 09:27:59'),(7,5,2,4,'2017-01-18 09:33:21'),(7,5,2,5,'2017-01-18 09:34:50'),(7,5,1,6,'2017-01-18 09:34:56'),(7,5,1,7,'2017-01-18 09:42:13'),(7,5,2,8,'2017-01-18 09:42:55'),(7,5,2,9,'2017-01-18 09:47:12'),(7,5,2,10,'2017-01-18 09:53:54'),(13,5,1,11,'2017-01-18 11:40:02'),(13,5,1,12,'2017-01-18 11:54:29'),(13,5,2,13,'2017-01-18 11:56:48'),(13,5,1,14,'2017-01-18 11:58:28'),(13,5,1,15,'2017-01-18 11:59:57'),(13,5,2,16,'2017-01-18 12:01:07'),(13,5,1,17,'2017-01-18 12:03:51'),(13,5,1,18,'2017-01-18 12:04:18'),(13,5,2,19,'2017-01-18 12:04:40'),(13,5,1,20,'2017-01-18 12:05:29'),(13,5,2,21,'2017-01-18 12:07:09'),(13,5,2,22,'2017-01-18 12:07:21'),(13,5,2,23,'2017-01-18 12:07:39'),(13,5,1,24,'2017-01-18 12:09:16'),(13,5,1,25,'2017-01-18 12:09:20'),(13,5,1,26,'2017-01-18 12:09:22'),(13,5,2,27,'2017-01-18 12:10:02'),(13,5,1,28,'2017-01-18 12:15:18'),(13,5,2,29,'2017-01-18 12:15:45'),(13,5,2,30,'2017-01-18 12:16:34'),(13,5,1,31,'2017-01-18 12:17:11'),(13,5,2,32,'2017-01-18 12:19:04'),(13,5,1,33,'2017-01-18 12:22:17'),(13,5,2,34,'2017-01-18 12:23:36'),(13,5,1,35,'2017-01-18 12:24:59'),(13,5,2,36,'2017-01-18 12:31:00'),(13,5,2,37,'2017-01-18 12:32:09'),(13,31,27,38,'2017-01-18 14:01:20'),(13,1,9,39,'2017-01-18 14:09:34'),(13,1,6,40,'2017-01-18 14:12:13'),(13,1,3,41,'2017-01-18 14:15:17'),(14,30,26,42,'2017-01-19 18:24:07'),(14,1,7,44,'2017-01-18 15:33:12'),(15,30,25,45,'2017-01-18 16:10:13'),(32,30,25,46,'2017-01-19 12:21:52'),(14,32,31,47,'2017-01-19 18:24:20'),(38,1,16,48,'2017-01-20 10:44:39'),(37,33,33,49,'2017-01-20 10:56:31'),(38,33,32,50,'2017-01-20 10:47:58'),(40,33,33,51,'2017-01-20 10:47:31'),(36,33,32,52,'2017-01-20 10:47:16'),(41,33,32,53,'2017-01-20 10:47:11'),(42,33,33,54,'2017-01-20 10:47:47'),(44,33,33,55,'2017-01-20 11:05:27');
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

-- Dump completed on 2017-01-23 15:32:15
