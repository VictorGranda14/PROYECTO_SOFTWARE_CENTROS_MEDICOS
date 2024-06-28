-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bd_centros_medicos
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cita`
--

DROP TABLE IF EXISTS `cita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cita` (
  `idcita` int NOT NULL AUTO_INCREMENT,
  `hora` time NOT NULL,
  `fecha` date NOT NULL,
  `motivo` varchar(45) NOT NULL,
  `idFuncionarioSalud` varchar(45) NOT NULL,
  `idPaciente` varchar(45) NOT NULL,
  PRIMARY KEY (`idcita`),
  KEY `idFuncionarioSalud_idx` (`idFuncionarioSalud`),
  KEY `idPaciente_idx` (`idPaciente`),
  CONSTRAINT `idFuncionarioSalud` FOREIGN KEY (`idFuncionarioSalud`) REFERENCES `funcionariosalud` (`idFuncionarioSalud`),
  CONSTRAINT `idPaciente` FOREIGN KEY (`idPaciente`) REFERENCES `paciente` (`idPaciente`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cita`
--

LOCK TABLES `cita` WRITE;
/*!40000 ALTER TABLE `cita` DISABLE KEYS */;
INSERT INTO `cita` VALUES (35,'16:00:00','2021-05-08','Dolor en el Pecho','24681012-9','11957526-5'),(38,'12:00:00','2021-05-08','Esguince tobillo','14708788-8','21160315-1'),(39,'15:00:00','2021-05-13','Malestar General','24681012-9','21160315-1');
/*!40000 ALTER TABLE `cita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examen`
--

DROP TABLE IF EXISTS `examen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examen` (
  `idExamen` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `rutaArchivo` varchar(255) NOT NULL,
  `idPaciente` varchar(45) NOT NULL,
  `idFuncionario` varchar(45) NOT NULL,
  PRIMARY KEY (`idExamen`),
  KEY `idPaciente_idx` (`idPaciente`),
  KEY `idFuncionario_idx` (`idFuncionario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examen`
--

LOCK TABLES `examen` WRITE;
/*!40000 ALTER TABLE `examen` DISABLE KEYS */;
INSERT INTO `examen` VALUES (5,'2022-08-04 21:55:00','1718681471048-papa-francesco-enciclica-laudato-si-sp.pdf','21160315-1','14708788-8'),(8,'2021-05-07 05:16:00','1718687782527-INFORME_MN_3r_ Avance.pdf','21160315-1','14708788-8'),(13,'2021-05-14 02:07:00','1719540448702-Examen_medico.pdf','21160315-1','11969133-8');
/*!40000 ALTER TABLE `examen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionariosalud`
--

DROP TABLE IF EXISTS `funcionariosalud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionariosalud` (
  `idFuncionarioSalud` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `primerApellido` varchar(45) NOT NULL,
  `segundoApellido` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `especialidad` varchar(45) DEFAULT NULL,
  `numTelefono` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`idFuncionarioSalud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionariosalud`
--

LOCK TABLES `funcionariosalud` WRITE;
/*!40000 ALTER TABLE `funcionariosalud` DISABLE KEYS */;
INSERT INTO `funcionariosalud` VALUES ('11969133-8','Juan','Perez','Gonzalez','admin@example.com','Neurocirujano','123123123','admin1'),('14708788-8','Felix','Granda','Mancuello','felixgranda@hotmail.com','Pediatra','994190572','asdasd123'),('24681012-9','Benjamín','Rojas','Pino','benja@gmail.com','Ginecólogo','123453567','asdasd123');
/*!40000 ALTER TABLE `funcionariosalud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historiaclinica`
--

DROP TABLE IF EXISTS `historiaclinica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historiaclinica` (
  `idHistoria` int NOT NULL AUTO_INCREMENT,
  `nombrePaciente` varchar(45) NOT NULL,
  `fechaIngreso` date NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `diagnostico` varchar(45) NOT NULL,
  `antecedentes` varchar(45) DEFAULT NULL,
  `idPaciente` varchar(45) NOT NULL,
  PRIMARY KEY (`idHistoria`),
  KEY `rutPaciente_idx` (`idPaciente`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historiaclinica`
--

LOCK TABLES `historiaclinica` WRITE;
/*!40000 ALTER TABLE `historiaclinica` DISABLE KEYS */;
INSERT INTO `historiaclinica` VALUES (19,'Victor Granda','2021-05-13','Dolor de cabeza grave','Cáncer cerebral','','21160315-1'),(20,'Victor Granda','2020-04-12','Esguince de tobillo','Cancer','','21160315-1');
/*!40000 ALTER TABLE `historiaclinica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `idPaciente` varchar(45) NOT NULL,
  `fechaNacimiento` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `primerApellido` varchar(45) NOT NULL,
  `segundoApellido` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `numTelefono` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`idPaciente`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES ('11957526-5','1998-12-12','nombre','apellidoP','apellidoM','ejemplo@mail.com','calle 123','123123123','pass123'),('12345678-9','1990-04-15','Ramiro','Magnatera','Perez','ramiro.magnatera@example.com','Avenida Siempreviva 742','0987654321','pass123'),('21160315-1','1980-05-20','Victor','Granda','Lopez','victor.granda@example.com','Calle Falsa 123','1234567890','paciente1'),('21280416-9','2003-02-04','Ramiro','Magnatera','Magnatera','ramiro.magnatera@gmail.com','La Santa Maria 947','123123123','pass123'),('23423423-4','1980-05-20','Benjamín','Rojas','Melano','benjita@example.com','Calle Real 123','342534523','pass123');
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-27 23:59:34
