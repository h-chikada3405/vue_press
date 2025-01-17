<?php
/**
 * 管理画面の見た目をカスタマイズする設定
 *
 * @package top_basic
 * @author TOP co,ltd.
 */

/**
 * 管理画面カスタム
 */
function my_dashboard_print_styles(): void {
  ?>
    <style type="text/css">
      body {
        font-family: "Noto Sans JP", serif !important;
      }
    </style>
  <?php
}
add_action('admin_print_styles', 'my_dashboard_print_styles');
