CREATE TABLE `f_article` (
  `id` varchar(30) NOT NULL COMMENT 'id',
  `article_category_id` varchar(30) NOT NULL COMMENT '分类id',
  `name` varchar(100) NOT NULL COMMENT '名称',
  `author` varchar(10) NOT NULL COMMENT '作者',
  `content` text NOT NULL COMMENT '内容',
  `cover` varchar(100) NOT NULL COMMENT '封面',
  `is_show_cover` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否显示封面{0:不显示,1:显示}',
  `tag` varchar(100) DEFAULT NULL COMMENT '标签',
  `seo_url` varchar(200) DEFAULT NULL COMMENT 'SEO链接',
  `seo_title` varchar(200) DEFAULT NULL COMMENT 'SEO描述',
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章';