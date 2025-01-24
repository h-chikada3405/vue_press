<?php
/**
 * カスタム投稿設定
 *
 * @package top_basic
 * @author TOP co,ltd.
 */
function custom_post_type() {
  $args = array(
    'label'           => '営業所案内',
    'labels'          => array(
                            'name'                => '営業所案内',
                            'singular_name'       => '営業所案内一覧',
                            'add_new_item'        => '営業所案内を追加',
                            'add_new'             => '新規追加',
                            'new_item'            => '新しい営業所案内',
                            'view_item'           => '営業所案内を表示',
                            'not_found'           => '営業所案内は見つかりませんでした',
                            'not_found_in_trash'  => 'ゴミ箱に営業所案内はありません。',
                            'search_items'        => '営業所案内を検索',
                          ),
    'description'     => '',
    'public'          => true,
    'show_ui'         => true,
    'query_var'       => true,
    'capability_type' => 'post',
    'hierarchical'    => false,
    'menu_position'   => 5,
    'supports'        => array('title', 'editor', 'thumbnail'),
    'has_archive'     => true,
    'show_in_rest'    => true,
    'rewrite'         => array('slug' => 'company/office'),
  );
  register_post_type('office', $args);
}
add_action('init', 'custom_post_type');
