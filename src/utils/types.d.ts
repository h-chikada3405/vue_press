export interface WordPressPage {
  author: number;
  class_list: string[];
  comment_status: string;
  content: {
    rendered: string;
    protected: boolean;
  };
  date: string;
  date_gmt: string;
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  guid: {
    rendered: string;
  };
  id: number;
  link: string;
  menu_order: number;
  meta: {
    footnotes: string;
  };
  modified: string;
  modified_gmt: string;
  parent: number;
  ping_status: string;
  slug: string;
  status: string;
  template: string;
  title: {
    rendered: string;
  };
  type: string;
}
