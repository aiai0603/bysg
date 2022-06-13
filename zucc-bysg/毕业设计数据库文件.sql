/*
Navicat MySQL Data Transfer

Source Server         : 我的阿里
Source Server Version : 50734
Source Host           : 47.97.158.11:3306
Source Database       : tableCards

Target Server Type    : MYSQL
Target Server Version : 50734
File Encoding         : 65001

Date: 2022-05-11 11:10:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` varchar(255) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `delete_flag` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'root', '123456', '1', '0', '2022-01-29 14:44:20', '0');
INSERT INTO `admin` VALUES ('24', 'fengjin', '123456', '1', '0', '2022-05-02 21:24:07', '1');
INSERT INTO `admin` VALUES ('25', 'putong', '123456', '2', '0', '2022-05-02 21:24:28', '0');
INSERT INTO `admin` VALUES ('26', 'shanchu', '123456', '1', '1', '2022-05-02 21:27:03', '0');
INSERT INTO `admin` VALUES ('27', 'root1', '123456', '1', '0', '2022-05-08 20:51:59', '0');

-- ----------------------------
-- Table structure for bind
-- ----------------------------
DROP TABLE IF EXISTS `bind`;
CREATE TABLE `bind` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `user_id` int(32) NOT NULL,
  `delete_flag` int(32) NOT NULL,
  `conference_id` int(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bind
-- ----------------------------
INSERT INTO `bind` VALUES ('18', '0', '0', '5');
INSERT INTO `bind` VALUES ('19', '0', '0', '6');
INSERT INTO `bind` VALUES ('20', '8', '0', '5');
INSERT INTO `bind` VALUES ('21', '8', '1', '6');
INSERT INTO `bind` VALUES ('22', '8', '0', '7');

-- ----------------------------
-- Table structure for conference
-- ----------------------------
DROP TABLE IF EXISTS `conference`;
CREATE TABLE `conference` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conference_name` varchar(255) NOT NULL,
  `conference_pwd` varchar(255) NOT NULL,
  `num` int(11) NOT NULL,
  `delete_flag` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of conference
-- ----------------------------
INSERT INTO `conference` VALUES ('5', 'test1', '123456', '10', '0', '2022-05-02 21:27:42', '0', '1');
INSERT INTO `conference` VALUES ('6', 'test2', '123456', '10', '0', '2022-05-02 21:27:49', '0', '1');
INSERT INTO `conference` VALUES ('7', 'fengjin', '123456', '10', '0', '2022-05-02 21:31:56', '1', '1');

-- ----------------------------
-- Table structure for equipment
-- ----------------------------
DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `equipment_id` varchar(255) NOT NULL,
  `equipment_version` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `conference_room` int(11) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `delete_flag` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `state` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of equipment
-- ----------------------------
INSERT INTO `equipment` VALUES ('6', 'test', '1.0', 'http://47.97.158.11:8087/pictures/2022-05-08-21-13-59.tmp_b60624b6c077fc3664ea184e0ccdcce730a27477429a7b74.jpg', '5', '192.168.174.62', '0', '2022-05-08 21:06:49', '0');
INSERT INTO `equipment` VALUES ('7', 'test2', '1.0', 'http://47.97.158.11:8087/pictures/2022-05-09-10-38-53.tmp_89780a5e465e757a12d760d37ef06a74939812c6d9c733b5.jpg', '5', '192.168.51.155', '0', '2022-05-09 10:38:21', '0');
INSERT INTO `equipment` VALUES ('8', 'test3', '1.0', '暂无数据', '0', '暂无数据', '0', '2022-05-02 21:31:12', '0');
INSERT INTO `equipment` VALUES ('9', 'test-error', '1.2', '', '6', '暂无数据', '1', '2022-05-03 09:02:07', '0');
INSERT INTO `equipment` VALUES ('10', 'test-error', '1.0', '暂无数据', '6', '暂无数据', '0', '2022-05-03 09:02:20', '0');
INSERT INTO `equipment` VALUES ('11', 'xin', '1', '暂无数据', '6', '暂无数据', '0', '2022-05-03 09:38:37', '0');
INSERT INTO `equipment` VALUES ('12', 'weifenpei', '1.0', '暂无数据', '6', '暂无数据', '0', '2022-05-08 20:52:39', '0');

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` timestamp NULL DEFAULT NULL,
  `finish_time` timestamp NULL DEFAULT NULL,
  `delete_flag` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `room_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of history
-- ----------------------------
INSERT INTO `history` VALUES ('9', '2022-05-02 21:39:11', '2022-05-02 21:42:17', '0', '测试会议1', '5');
INSERT INTO `history` VALUES ('10', '2022-05-02 21:46:00', '2022-05-03 09:43:17', '0', 'test2', '5');
INSERT INTO `history` VALUES ('11', '2022-05-03 09:00:40', '2022-05-08 21:08:13', '0', '新的会议', '6');
INSERT INTO `history` VALUES ('12', '2022-05-03 09:43:22', '2022-05-08 21:08:33', '0', 'ks', '5');
INSERT INTO `history` VALUES ('13', '2022-05-08 21:08:20', null, '0', '开始会议', '6');
INSERT INTO `history` VALUES ('14', '2022-05-08 21:08:38', '2022-05-08 21:08:43', '0', 'new', '5');
INSERT INTO `history` VALUES ('15', '2022-05-08 21:08:53', null, '0', 'new', '5');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) NOT NULL,
  `nick_name` varchar(255) NOT NULL,
  `avater` varchar(255) NOT NULL,
  `delete_flag` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `state` int(11) NOT NULL,
  `pre` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('8', 'o9gEG5GCuwmeIyfJ9D1eWW8ZYisA', '今天被开除了吗', 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqVibbIVpnJCChUmuIEhSFbqtw0ribTVaYFsy2eNtTUHG4LNxPicB7r1hDZg4lKdJY079UDZId7zmobQ/132', '0', '2022-05-08 21:11:18', '0', '0');
INSERT INTO `user` VALUES ('9', 'o9gEG5OuIAS-Me_UtbEm_6optHDo', 'SoulG', 'https://thirdwx.qlogo.cn/mmopen/vi_32/oIzu6fwdDS7UwEBpDRvTsibjk9zAicHiaEWMuqE6kj3ibQVibnGNPjxxZZdRWQCMs9tF03c4iawic11hb7fHrphrLnxAg/132', '0', '2022-05-03 08:39:18', '0', '0');
INSERT INTO `user` VALUES ('10', 'o9gEG5MhW_1xUCbi6ojbIYegKcXI', 'BLANK', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJeQVzYNLVuOiaJcg093gCWvWT76uoND0bQITvmF4H43kFEL6icmXVEj7hGQoUTRkhDPPbQK2dCg8rg/132', '0', '2022-05-03 08:39:23', '0', '0');
