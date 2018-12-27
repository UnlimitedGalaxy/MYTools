import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import Pagination from 'antd/lib/pagination';

import { success, error } from '../../utils/Toast';
import { serializeParam, checkNull, filterData, produceData, throttle } from '../../utils/tools';
import CommonForm from '../../components/CommonForm';

/*
* 用于暴露出去的方法
* 1. updateTableData
* 2. editTableData
* */
export default class CommonView extends Component {
  static proptypes = {
    settings: PropTypes.object.isRequired,
    getDataPromise: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    // 可选，这个promise用于搜索数据时候使用，默认用settings.defaultValue来初始化，所以一般不需要用到
    filterCondition: PropTypes.object,
    // 可选，用于处理不同tag的时候使用
    searchMethod: PropTypes.func,
    // 可选，用于插入到表格和form之间的node
    extraButtons: PropTypes.Array,
    // 可选，获取CommonViewObj
    getViewSelf: PropTypes.func,
  }
  
  constructor(props) {
    super(props);
    const self = this;
    this.inner = {
      settings: self.processSettings.call(self, this.props.settings),
    };
    
    // 初始化默认查询
    this.filterCondition = this.props.filterCondition ? {...this.props.filterCondition, ...this.getDefaultValue(this.props.settings)} : this.getDefaultValue(this.props.settings);
    if (!this.filterCondition.size) {
      this.filterCondition.size = 10;
    }
    
    this.state = {
      tableData: [],
      loading: false,
    };
    
    const pageElements = [ 'page', 'size' ];
    
    this.filterProxy = new Proxy(this.filterCondition, {
      set(target, key, value, receiver) {
        if (!pageElements.includes(key)) {
          self.filterCondition.page = 1;
        }
        Reflect.set(target, key, value, receiver);
        self._getTableData();
        return true;
      }
    });
  
    if (this.props.getViewSelf) {
      this.props.getViewSelf(this);
    }
    /*
    *  {
            type: 'input',
            label: '位置Id',
            valueName: 'position_id',
            props: {
              defaultValue: this.props.position_id,
              onChange(val) {
                self.filterProxy.position_id = val;
              }
            },
            field: {
              rules: [
                {required: true},
              ],
            },
          },
    * */
  }
  
  processSettings(settings) {
    const self = this;
    if (Array.isArray(settings.children)) {
      settings.children.forEach(i => {
        //联动同步响应，当form的val变化的时候，立即搜索
        i.props = i.props || {};
        if (i.props && i.props.onChange) {
          const onChangeContainer = i.props.onChange;
          i.props.onChange = function(val, cell) {
            if (i.valueName) {
              self.filterProxy[i.valueName] = val;
            }
            onChangeContainer.apply(this, arguments);
          };
        } else {
          i.props.onChange = function(val, cell) {
            if (i.valueName) {
              self.filterProxy[i.valueName] = val;
            }
          };
        }
        if (i.type === 'input' || i.needThrottle) {
          const tempOnChange = i.props.onChange;
          i.props.onChange = function(val, cell) {
            throttle(tempOnChange, self, [val, cell]);
          };
        }
      });
    }
    // 注意传进来的onSure 会被覆盖掉
    settings.footer.sureButton.onSure = self.searchData;
    return settings;
  }
  
  getDefaultValue(settings) {
    let defaultValue = {};
    if (Array.isArray(settings.children)) {
      settings.children.forEach(i => {
        if (i.props && i.props.defaultValue && i.valueName) {
          defaultValue[i.valueName] = i.props.defaultValue;
        }
      });
    }
    return defaultValue;
  }
  
  searchData = (val, tags) => {
    if (this.props.searchMethod) {
      if (this.props.searchMethod.call(this, val, tags)) {
        return;
      }
    }
    this.filterProxy.page = 1;
  }
  
  async _getTableData() {
    this.setState({
      loading: true,
    });
    
    try {
      const res = await this.props.getDataPromise(this.filterCondition);
      if (res.tableData) {
        if (res.tableData && res.tableData.length > 0) {
          this.setState({
            tableData: res.tableData.map((item, index) => {
              item.key = index;
              return item;
            }),
            total: res.total,
          });
          success('获取数据成功');
        } else if (res.tableData.length === 0) {
          this.setState({
            tableData: [],
            total: 0,
          });
          success('寻找不到该条内容');
        }
      }
    } catch (e) {
      error('获取Table数据失败' + e.message);
    }
    this.setState({
      loading: false,
    });
  }
  
  onShowSizeChange = (page, size) => {
    this.filterProxy.size = size;
  }
  
  onPageChange = (page) => {
    this.filterProxy.page = page;
  }
  
  editTableData = (data) => {
    if (checkNull(data.key)) {
      throw new Error('data.key 不能为空');
    }
    const tableData = this.state.tableData;
    const index = tableData.findIndex((item) => item.key == data.key);
    tableData[index] = { ...tableData[index], ...data };
    this.setState(
      tableData,
    );
  }
  
  updateTableData = () => {
    this._getTableData();
  }
  
  componentDidMount() {
    this.searchData();
  }
  
  render() {
    return (
      <div>
        <CommonForm settings={this.inner.settings} />
        {this.props.extraButtons && this.props.extraButtons}
        <Table
          pagination={false}
          loading={this.state.loading}
          dataSource={this.state.tableData}
          columns={this.props.columns} />
        <div style={{ textAlign: 'center', margin: 10 }}>
          <Pagination
            showSizeChanger
            pageSizeOptions={['10', '20', '30', '40', '50', '70', '100']}
            onShowSizeChange={this.onShowSizeChange}
            pageSize={Number(this.filterCondition.size)}
      
            showTotal={(total) => (<span>{`共 ${total} 条数据`}</span>)}
            total={this.state.total}
      
            current={this.filterCondition.page}
            onChange={this.onPageChange}
            showQuickJumper
          />
        </div>
      </div>
    );
  }
}
