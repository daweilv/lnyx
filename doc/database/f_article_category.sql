CREATE TABLE `f_article_category` (
  `id` varchar(30) NOT NULL COMMENT 'id',
  `parent_id` varchar(30) NOT NULL DEFAULT '0' COMMENT '父id',
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `seq` int(11) DEFAULT NULL COMMENT '排序号',
  `is_show` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否可见{0:不可见,1:可见}',
  `seo_url` varchar(50) DEFAULT NULL COMMENT 'SEO链接',
  `seo_keywords` varchar(200) DEFAULT NULL COMMENT 'SEO关键词',
  `seo_description` varchar(200) DEFAULT NULL COMMENT 'SEO描述',
  `create_at` varchar(24) DEFAULT NULL COMMENT '创建日期',
  `create_by` varchar(30) DEFAULT NULL COMMENT '创建人',
  `update_at` varchar(24) DEFAULT NULL COMMENT '更新日期',
  `update_by` varchar(30) DEFAULT NULL COMMENT '更新人',
  `delete_at` varchar(24) DEFAULT NULL COMMENT '删除日期',
  `delete_by` varchar(30) DEFAULT NULL COMMENT '删除人',
  PRIMARY KEY (`id`),
  UNIQUE KEY `seo_url` (`seo_url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章分类';