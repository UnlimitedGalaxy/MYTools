/*
* reconciliation: diff algorithm
* */

function diff(oldVDom, newVDom) {
  // 新建node
  if (oldVDom == undefined) {
    return {
      type: nodePatchTypes.CREATE,
      vdom: newVDom
    }
  }
  
  // 删除node
  if (newVDom == undefined) {
    return {
      type: nodePatchTypes.REMOVE
    }
  }
  
  // 替换node
  if (
    typeof oldVDom !== typeof newVDom ||
    ((typeof oldVDom === 'string' || typeof oldVDom === 'number') && oldVDom !== newVDom) ||
    oldVDom.tag !== newVDom.tag
  ) {
    return {
      type: nodePatchTypes.REPLACE,
      vdom: newVDom
    }
  }
  
  // 更新node
  if (oldVDom.tag) {
    // 比较props的变化
    const propsDiff = diffProps(oldVDom, newVDom);
    
    // 比较children的变化
    const childrenDiff = diffChildren(oldVDom, newVDom);
    
    // 如果props或者children有变化，才需要更新
    if (propsDiff.length > 0 || childrenDiff.some( patchObj => (patchObj !== undefined) )) {
      return {
        type: nodePatchTypes.UPDATE,
        props: propsDiff,
        children: childrenDiff
      }
    }
  }
}

function tick(element) {
  if (state.num > 20) {
    clearTimeout(timer);
    return;
  }
  
  const newVDom = view();
  
  // 生成差异对象
  const patchObj = diff(preVDom, newVDom);
  
  preVDom = newVDom;
  
  // 给dom打个补丁
  patch(element, patchObj);
}
