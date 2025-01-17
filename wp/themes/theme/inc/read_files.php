<?php
/**
 * ユーザー別カスタマイズ
 *
 * @package top_basic
 * @author TOP co,ltd.
 */

/**
 * 管理画面用スタイルシート読み込み
 */
function set_admin_styles() {
  wp_enqueue_style('block-editor-style', get_theme_file_uri('/css/editor.css'), array(), wp_get_theme()->get('Version'));
}
add_action('wp_enqueue_scripts', 'set_admin_styles');

/**
 * 管理画面用Javascript読み込み
 */
function set_admin_scripts() {
}
add_action('admin_enqueue_scripts', 'set_admin_scripts');
