import React, { PureComponent } from 'react';
import './JarLoading.scss';
import PropType from 'prop-types';
import IceEvents from '@ali/ice-events';
import { Button} from '@alife/next';
import { deepCopy } from '../../utils/tools';

/*
* 注意使用时，需要先将target置0
* */
@IceEvents
class JarLoading extends PureComponent {
  static propTypes = {
    target: PropType.number,
    speed: PropType.number, // 毫秒，越大越慢
  };
  
  static defaultProps = {
    target: 0,
    speed: 900
  };
  
  static originData = {
    percent: 0,
    speed: 0,
    visible: false,
  }
  
  constructor(props) {
    super(props);
    this.inner = {
      speedUp: 20, //percent 落后于props.target的时候的速度
    };
    this.state = deepCopy(JarLoading.originData);
  }
  
  closeDialog() {
    this.setState(
      deepCopy(JarLoading.originData)
    );
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.target === 100 && this.state.percent === 99) {
      this.setState({
        percent: 100
      }, this.closeDialog);
    }
  }
  
  /*
  * 如果
  * 1. percent达到了100，但target没有达到一百
  *  -> 暂停在99，等到target为100的时候再更新为100%，并关闭窗口
  * 2. target达到100，percent没有达到一百
  * -> 继续走，当达到一百的时候，关闭窗口
  * */
  
  startLoading() {
    return setTimeout(() => {
      if (!this.state.visible) {
        return null; // 如果不可见，也没有必要更新了
      }
      if (this.state.percent === 99 && this.props.target !== 100) {
        return null;
      }
      if (this.state.percent === 100 && this.props.target === 100) {
        return this.closeDialog();
      }
      if (this.state.percent >= 100 || !this.state.visible) { // 如果已经是100或者大于100了，就不用再继续了
        return null;
      }
      if (this.state.percent >= this.props.target) {
        this.state.speed = this.props.speed;
      } else {
        this.state.speed = this.inner.speedUp;
      }
      
      this.setState((prev) => {
        return {
          percent: prev.percent + 1
        };
      });
      this.startLoading();
    }, this.state.speed);
  }
  
  
  componentDidMount() {
    // this.startLoading();
    this.on('ActivateJarLoading', (visible) => {
      this.setState({
        visible,
        percent: 0,
      }, () => {
        if (visible) {
          this.startLoading();
        }
      });
    });
  }
  
  
  render() {
    const {visible, percent} = this.state;
    return (
      visible && <div className="jar-background">
        <div className="jar">
          <div className="mouth" />
          <div className="neck" />
          <div className="base">
            <div className="liquid" />
            <div className="wave" />
            <div className="wave" />
            <div className="bubble" />
            <div className="bubble" />
            <div className="jar-loading-percent">{percent}%</div>
          </div>
          <div className="bubble" />
          <div className="bubble" />
        </div>
        <p className="jar-loading-word">loading</p>
        {/*<div>*/}
          {/*<Button type="secondary" onClick={() => {*/}
            {/*this.props.target = 50;*/}
          {/*}} size="small" className="buttonGapRight">setTarget</Button>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default JarLoading;
