<?php
/**
 * ユーザー別カスタマイズ
 *
 * @package top_basic
 * @author TOP co,ltd.
 */

/**
 * ブロックエディタ用スタイル読み込み
 */
function set_block_editor_styles(): void {
  add_editor_style('css/editor-style.css');
  add_theme_support('editor-styles');
}
add_action('after_setup_theme', 'set_block_editor_styles');

/**
 * 管理画面用 css 読み込み
 */
function set_admin_styles(): void {
  wp_enqueue_style('Noto Sans', 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Zen+Kaku+Gothic+New&display=swap', array(), null);
}
add_action('admin_enqueue_scripts', 'set_admin_styles');

/**
 * 管理画面用 Javascript 読み込み
 */
function set_admin_scripts(): void {
}
add_action('admin_enqueue_scripts', 'set_admin_scripts');
