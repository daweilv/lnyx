CREATE TABLE `f_article_category` (
  `id` varchar(30) NOT NULL COMMENT 'id',
  `parent_id` varchar(30) NOT NULL DEFAULT '0' COMMENT '父id',
  `name` varchar(300) DEFAULT NULL COMMENT '名称',
  `seq` int(11) DEFAULT NULL COMMENT '排序号',
  `create_at` varchar(24) DEFAULT NULL COMMENT '创建日期',
  `create_by` varchar(30) DEFAULT NULL COMMENT '创建人',
  `update_at` varchar(24) DEFAULT NULL COMMENT '更新日期',
  `update_by` varchar(30) DEFAULT NULL COMMENT '更新人',
  `delete_at` varchar(24) DEFAULT NULL COMMENT '删除日期',
  `delete_by` varchar(30) DEFAULT NULL COMMENT '删除人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章分类';