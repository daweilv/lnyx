CREATE TABLE `f_visit` (
  `id` varchar(30) NOT NULL COMMENT 'id',
  `session_id` varchar(50) NOT NULL COMMENT '会话id',
  `ip` varchar(30) NOT NULL COMMENT 'ip地址',
  `geolocation` varchar(100) DEFAULT NULL COMMENT '地理位置',
  `useragent` varchar(500) DEFAULT NULL COMMENT '用户代理',
  `browser` varchar(10) DEFAULT NULL COMMENT '浏览器',
  `referrer` varchar(500) DEFAULT NULL COMMENT '来源',
  `url` varchar(500) NOT NULL DEFAULT '' COMMENT '访问地址',
  `param` varchar(200) DEFAULT NULL COMMENT '查询参数',
  `view_at` varchar(24) NOT NULL COMMENT '浏览日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='访问记录';