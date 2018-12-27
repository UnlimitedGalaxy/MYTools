/*
 * {
 *   style: {},
 *   className: []|'',
 *   props: {}
 *   size: num, //不设置，默认为1,即垂直排布
 *   formItemLayout: { labelCol: { span: 6 },wrapperCol: { span: 18 } }
 *   children: [
 *    {
 *      label: '',
 *      valueName: '', // 必须与别的children不一样
 *      type: 'Select | Input | ...',
 *      props: {}, //如果props里面包含onChange事件，会被我写到feild里面
 *      field: {},
 *      install: function(self, settings)// 可用于异步请求更新组件
 *     }
 *   ],
 *   footer: {
 *    sureText: '确定',//默认是确定
 *    cancelText: '取消', //默认是不出现的，当定义了时候出现
 *    add: [{name: '', tag: '',}] // 需要name，需要tag来标识这个按钮
 *    bottomStyle: {},// 用于设置button的位置
 *   }
 *
 * }
 * @example
 * {
 *    props: { labelAlign: 'top', },
 *    style: { background: '#fff', width: '66%', },
 *    cancelText: '重置',
 *    sureText: '提交',
 *    bottomStyle: { justifyContent: 'center', textAlign: 'center' },
 *    children: [
 *      {
 *        type: 'select',
*         label: '后台业务ID',
*         valueName: 'admin_id',
*         props: {
*          placeholder: "后台业务ID",
*          dataSource: [
*            { label: 'watermarker', value: 'watermarker', },
*          ],
*        }
*     ]
*   }
 * overall: 数据的变化都在CommonForm完成，输出的是最终变化结果
 * */
/*
*  history
*  1、如果要监听具体某个component，就不能用field，因为再定义 ref value onChange 事件, 会被 init 覆盖
*  方案：在field的init方法里注册onChange事件
*  2. 不能直接赋值给state.settings，会影响原来props.settings的数据结构
*  3. 允许不设置footer, 优化render函数
*  4. 增加uninstall方法清除无用数据
*  5. select类型全部改成antdselecct
*  6. 增加错误检测，防止错误难以定位
* */
/* 需求
* 1.
* */
import React, { Component } from 'react';
import {
  Form,
  Input,
  Switch,
  Grid,
  Button,
  Icon,
  Balloon,
  Field,
  Select,
  DatePicker,
  moment,
  NumberPicker,
  Radio
} from '@alife/next';

const { Group: RadioGroup } = Radio;
import AntdSelect from 'antd/lib/select';
import AntdTreeSelect from 'antd/lib/tree-select';
import 'antd/lib/tree-select/style/index';
import AntdCascader from 'antd/lib/cascader';
import 'antd/lib/cascader/style/index';
import PropTypes from 'prop-types';
import {__, curry} from 'ramda';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const { MonthPicker, YearPicker, RangePicker } = DatePicker;
import { splitArr, deepCopy } from '../../utils/tools';
const AntdOption = AntdSelect.Option;
const AntdOptGroup = AntdSelect.OptGroup;


const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
const style = {
  padding: '20px 20px 0',
  background: '#F7F8FA',
};
export default class CommonForm extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    loading: PropTypes.bool
  }
  
  constructor(props, context) {
    super(props, context);
    this.field = new Field(this);
    // 不能直接赋值会影响原来的props的数据结构
    const settings = deepCopy(this.props.settings);
    // 重构一下settings并且绑定相关方法的this位CommonForm不能直接用props
    settings.size = settings.size || 1;
    settings.style = settings.style || {};
    if (Array.isArray(settings.children)) {
      settings.children.forEach((cell) => {
        cell.field = this._initField(cell);
      });
  
      settings.children = splitArr(settings.children, settings.size);
    } else {
      settings.children = [[]];
    }
    
    this.state = {
      settings: settings,
      id: +new Date(),
    };
  }
  
  _initField = (cell) => {
    let elem = null;
    let initFiled = cell.field || {};
    let initObj = {};
  
    // 为field内面的validator绑定this
    if (cell.field && cell.field.rules && (elem = cell.field.rules.find((item) => 'validator' in item))) {
      elem.validator.bind(this);
    }
  
    if (cell.props && cell.props.loadData) {
      if (cell.props.loadData.length > 1) {
        cell.props.loadData = curry(cell.props.loadData.bind(this))(__, cell);
      } else {
        cell.props.loadData = cell.props.loadData.bind(this);
      }
    }
    
    if ('onChange' in (cell.props || {})) {
      let tempChange = '';
      if (cell.props.onChange.length > 1) {
        let temp = [];
        for (let i = 0; i < (cell.props.onChange.length - 1); i++) {
          temp.push(__);
        }
        tempChange = curry(cell.props.onChange.bind(this))(...temp, cell);
      } else {
        tempChange = cell.props.onChange.bind(this);
      }
      initObj = this.field.init(cell.valueName, {
        ...initFiled,
        props: {
          // 把cell自身的引用写进去
          // curry 会根据函数的length来执行的，只有当length为2的时候才需要引用自身
          onChange: tempChange,
        },
      });
    } else {
      initObj = this.field.init(cell.valueName, {
        ...initFiled
      });
    }
    return initObj;
  }
  
  handleReset() {
    console.log('reset');
    this.field.reset();
    this.props.onCancel && this.props.onCancel();
    if (this.state.settings.footer.cancelButton) {
      this.state.settings.footer.cancelButton.onCancel && this.state.settings.footer.cancelButton.onCancel();
    }
  }
  
  handleSubmit(tag) {
    this.field.validate((errors, values) => {
      if (errors) {
        return;
      }
      // console.log('Submit!!!', values, tag);
      this.props.onSure && this.props.onSure(values, tag);
      this.state.settings.footer.sureButton.onSure && this.state.settings.footer.sureButton.onSure(values, tag);
    });
  }
  
  constructOption(input, key) {
    if (input.type === 'group') {
      return (<AntdOptGroup key={key} label={input.label}>
        {
          Array.isArray(input.value) &&
          input.value.map((item, innerIndex) => this.constructOption(item, `${key}-${innerIndex}`))
        }
      </AntdOptGroup>);
    } else {
      return (<AntdOption key={key}
        value={input.value}>{input.label}</AntdOption>);
    }
  };
  
  componentDidMount() {
    const self = this;
    // 这个没有什么用现在，因为可以自动查询
    // $('#' + this.state.id).keypress(function(e) {
    //   if (e.ctrlKey && e.keyCode == 10) {
    //     self.handleSubmit();
    //   }
    // });
    this.state.settings.children.forEach((cell) => {
      cell.forEach(i => {
        i.install && i.install.call(self, i);
      });
    });
  }
  
  componentWillUnmount() {
    this.state.settings.children.forEach((cell) => {
      cell.forEach(i => {
        i.uninstall && i.uninstall.call(self, i);
      });
    });
  }
  
  renderRow = (row, index) => {
    const settings = this.state.settings;
  
    return (
    <Row key={'row' + index}>
      {row.map((cell, chilIndex) => {
        return (
          <Col
            style={{ flex: `0 0 ${Math.floor((1 / settings.size) * 10000) / 100}%` }}
            key={'row' + index + 'child' + chilIndex}>
            <FormItem
              {...{...formItemLayout, ...(settings.formItemLayout || {})}}
              label={cell.label || ' '}
              hasFeedback
            >
              {this.renderCell(cell)}
            </FormItem>
          </Col>
        );
      })}
    </Row>
    );
  };
  
  renderCell = (cell) => {
    // cell.forceUpdate 用于更换组件的情况需要重新激活新组件的onChange方法
    if (cell.forceUpdate) {
      cell.field = this._initField(cell);
    }
    cell.type = cell.type || '';
    switch (cell.type.toLowerCase()) {
      case 'input':
        return (<Input
          style={{ width: '100%', }}
          hasClear
          {...(cell.props || {})}
          {...cell.field}
        />);
      // case 'select':
      //   return (<Select
      //     style={{ width: '100%', }}
      //     hasClear
      //     {...(cell.props || {})}
      //     {...cell.field}
      //   />);
      case 'combobox':
        return (<Select.Combobox
          style={{ width: '100%', }}
          hasClear
          {...(cell.props || {})}
          {...cell.field}
          onInputUpdate={cell.props.onInputUpdate.bind(this)}
        />);
      case 'select':
      case 'antdselect':
        if (!Array.isArray(cell.props.dataSource)) {
          throw new Error('cell.props.dataSource必须为数组');
        }
        return (
          <AntdSelect
            style={{ width: '100%', }}
            allowClear
            {...(cell.props || {})}
            {...cell.field}
            size="large"
          >
            {
              cell.props.dataSource.map((item, innerIndex) => this.constructOption(item, innerIndex))
            }
          </AntdSelect>
        );
      // 它是用于得到上一级的值和下一级的值而存在的
      case 'antdcascader':
        return (
          <AntdCascader
            style={{ width: '100%', }}
            allowClear
            {...(cell.props || {})}
            {...cell.field}
            size="large"
          />
        );
      case 'antdtreeselect':
        return (
          <AntdTreeSelect
            style={{ width: '100%', }}
            allowClear
            {...(cell.props || {})}
            {...cell.field}
            size="large"
          />
        );
      case 'antdremote':
        let func = function() {};
        if (cell.props.onSearch) {
          if (cell.props.onSearch.length === 2) {
            func = curry(cell.props.onSearch.bind(this))(__, cell);
          } else {
            func = cell.props.onSearch.bind(this);
          }
        }
        return (
          <AntdSelect
            style={{ width: '100%', }}
            allowClear
            {...(cell.props || {})}
            {...cell.field}
            size="large"
            onSearch={func}
          >
            {
              cell.props.dataSource.map((item, innerIndex) => this.constructOption(item, innerIndex))
            }
          </AntdSelect>
        );
      case 'radio':
        return (<RadioGroup
          style={{ width: '100%', }}
          {...(cell.props || {})}
          {...cell.field}
        />);
      case 'datetime':
        return (<DatePicker
          showTime={{ defaultValue: moment('12:00:00', 'HH:mm:ss') }}
          style={{ width: '100%', }}
          {...(cell.props || {})}
          {...cell.field}
        />);
      case 'number':
        return (<NumberPicker
          stype="inline"
          defaultValue={0}
          style={{ width: '100%', }}
          {...(cell.props || {})}
          {...cell.field}
        />);
      case 'daterange':
        return (<RangePicker
          showTime={{ defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] }}
          style={{ width: '100%', }}
          {...(cell.props || {})}
          {...cell.field}
        />);
      case 'custom':
        if (cell.render) {
          return cell.render();
        } else {
          return '';
        }
      default:
        return '';
    }
  };
  
  renderFooter = () => {
    const settings = this.state.settings;
    if (!settings.footer) {
      return null;
    }
    return (
      <div>
        {
          settings.footer.sureButton && <Button type="primary" {...(settings.footer.sureButton ? settings.footer.sureButton.props : {})}
            loading={this.props.loading || false}
            onClick={this.handleSubmit.bind(this, 'sure')}>{settings.footer.sureButton ? settings.footer.sureButton.sureText : '确定'}</Button>
        }
        {
          settings.footer.add && Array.isArray(settings.footer.add) && settings.footer.add.map((item, index) => {
            if (item.render && typeof item.render === 'function') {
              return (<span key={index}>&nbsp;&nbsp;&nbsp;{item.render.apply(this)}</span>);
            }
            return (<span key={index}>&nbsp;&nbsp;&nbsp;<Button type="primary"
              onClick={this.handleSubmit.bind(this, item.tag)} {...(item.props ? item.props : {})}>{item.name}</Button></span>);
          })
        }
        {settings.footer.cancelButton && (<span>&nbsp;&nbsp;&nbsp;<Button
          onClick={this.handleReset.bind(this)}>{settings.footer.cancelButton.cancelText}</Button></span>)}
      </div>
    );
  }
  
  render() {
    const settings = this.state.settings;
    const footer = this.renderFooter();
    const {renderRow, renderCell} = this;
    
    return (
      <div id={this.state.id} style={{ ...style, ...settings.style }}>
        <Form
          field={this.field}
          labelAlign="left"
          {...settings.props}
          className={settings.className}>
          {
            settings.children.map((row, index) => renderRow(row, index))
          }
          
          {/* 表单的底部按钮 */}
          {
            footer && (settings.size !== 1 ? (
              <Row style={{ justifyContent: 'flex-end', ...(settings.footer.bottomStyle || {}) }}>
                <Col style={{ flex: `0 0 ${Math.floor((1 / settings.size) * 10000) / 100}%`, whiteSpace: 'nowrap' }}>
                  <FormItem {...formItemLayout}
                    label=" "
                  >
                    {footer}
                  </FormItem>
                </Col>
              </Row>
              /* 单列底部提交按钮需要居中的情况 */
            ) : (
              <Row style={{ justifyContent: 'center', ...(settings.footer.bottomStyle || {}) }}>
                {footer}
              </Row>
            ))
          }
        </Form>
      </div>
      
    );
  }
}

CommonForm.propTypes = {
  settings: PropTypes.object.isRequired,
};
