<?php
/**
 * カスタム投稿設定
 *
 * @package top_basic
 * @author TOP co,ltd.
 */
function custom_post_type() {
  $args = array(
    'label'           => '「カスタム投稿名」',
    'labels'          => array(
                            'name'                => '「カスタム投稿名」',
                            'singular_name'       => '「カスタム投稿名」一覧',
                            'add_new_item'        => '「カスタム投稿名」を追加',
                            'add_new'             => '新規追加',
                            'new_item'            => '新しい「カスタム投稿名」',
                            'view_item'           => '「カスタム投稿名」を表示',
                            'not_found'           => '「カスタム投稿名」は見つかりませんでした',
                            'not_found_in_trash'  => 'ゴミ箱に「カスタム投稿名」はありません。',
                            'search_items'        => '「カスタム投稿名」を検索',
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
  );
  register_post_type('custom', $args);

  register_taxonomy(
    'custom_tax',
    array('custom'),
    array(
      'hierarchical'      => true,
      'label'             => '「カスタムタクソノミー名」',
      'show_ui'           => true,
      'show_admin_column' => true,
    )
  );
}
add_action('init', 'custom_post_type');
