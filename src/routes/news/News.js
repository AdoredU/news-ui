import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import {Layout, Row, Col, Table, Button, Divider, Popconfirm} from 'antd';
import NewsModel from '../../components/newsModel';
import styles from './News.less';

const {Header, Footer, Content} = Layout;

class News extends PureComponent {

  handleDelete = (id) => {
    this.props.dispatch({
      type: 'news/handleDelNews',
      payload: {id}
    });
  };

  columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '时间',
      key: 'createTime',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
        <Button onClick={()=>this.editNews(record)} type="primary">编辑</Button>
        <Divider type="vertical"/>
        <Popconfirm
          title="确认删除吗?"
          onConfirm={() => this.handleDelete(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button type="danger">删除</Button>
        </Popconfirm>
      </span>
      )
    },
  ];

  handlePublishNews = () => {
    this.newsModel.showModal("发布新闻");
  };

  editNews = (record) => {
    this.newsModel.showModal("编辑新闻", record, record.id);
  };

  render() {
    const {list, dispatch} = this.props;
    return (
      <Fragment>
        <Layout className={styles.news}>
          <Header className={styles.header}><h1>新闻发布系统</h1></Header>
          <Content className={styles.main}>
            <Row>
              <Col span={4}></Col>
              <Col span={16}>
                <Button onClick={this.handlePublishNews} className={styles.btn} type="primary">发布新闻</Button>
                <Table size="small" rowKey={record=>record.id} columns={this.columns} dataSource={list} />
              </Col>
              <Col span={4}></Col>
            </Row>
          </Content>
          <Footer className={styles.footer}>@ AdoredU</Footer>
        </Layout>
        <NewsModel ref={newsModel=>this.newsModel=newsModel} dispatch={dispatch}/>
      </Fragment>
    );
  }
}

// 这里可以使用{news}解构值代替state，这样下面使用时不需要在state.news
const mapStateToProps = ({news}) => ({
  list: news.list,
});

export default connect(mapStateToProps)(News);
