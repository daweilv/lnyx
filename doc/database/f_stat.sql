CREATE TABLE `f_stat` (
  `id` varchar(30) NOT NULL COMMENT 'id',
  `ip` varchar(30) NOT NULL COMMENT 'ip地址',
  `geolocation` varchar(100) NOT NULL COMMENT '地理位置',
  `useragent` varchar(500) NOT NULL COMMENT '用户代理',
  `browser` varchar(10) NOT NULL COMMENT '浏览器',
  `url` varchar(200) NOT NULL COMMENT '访问地址',
  `query` varchar(200) NOT NULL COMMENT '查询参数',
  `create_at` varchar(24) DEFAULT NULL COMMENT '创建日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='网站统计';