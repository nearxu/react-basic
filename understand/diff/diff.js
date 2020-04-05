import { setAttribute } from "./dom";
import { isSameNodeType, removeNode } from "./utils";
import { setComponentProps } from "./render";
import { createComponent } from "./render";
export function diff(dom, vnode) {
  const result = diffNode(dom, vnode); // dom
  return result;
}

function diffNode(dom, vnode) {
  let copyDom = dom;
  if (vnode === undefined || vnode === null || typeof vnode === "boolean")
    return;
  if (typeof vnode == "number") vnode = String(vnode);

  if (typeof vnode === "string") {
    // text
    if (dom && dom.nodeType === 3) {
      if (dom.textContent !== vnode) {
        dom.textContent = vnode; // just repleceWith
      }
    } else {
      copyDom = document.createTextNode(vnode);
      if (dom && dom.parentNode) {
        dom.parentNode.replaceChild(copyDom, dom);
      }
    }
    return copyDom;
  }

  if (typeof vnode.tag === "function") {
    return diffComponent(dom, vnode);
  }

  if (!dom) {
    copyDom = document.createElement(vnode.tag);
  }

  if (vnode.children && vnode.children.length > 0) {
    diffChildren(copyDom, vnode.children);
  }

  diffAttribute(copyDom, vnode);

  return copyDom;
}

// 对比子节点
// 一个真实DOM和虚拟DOM对比，但是子节点是一个数组，它们可能改变了顺序，或者数量有所变化
// 给节点设一个key值，重新渲染时对比key值相同的节点
function diffChildren(dom, virChild) {
  const children = [];
  const keyed = {};

  // dom and virtual diff
  if (dom.childNodes) {
    for (const [k, v] of Object.entries(dom.childNodes)) {
      // lost child id ,dont diff
      if (v && v.key) {
        keyed[v.key] = v;
      } else {
        children.push(v);
      }
    }
  }

  // first render ,child value in the diffNode
  if (virChild && virChild.length > 0) {
    let min = 0;
    let childrenLen = children.length;
    for (let i = 0; i < virChild.length; i++) {
      const vchild = virChild[i];
      let child = children[children.length - 1];
      // everytime token foral child
      // for(let j = 0 ;j<childrenLen;j++){

      // }
      child = diffNode(child, vchild);
      const f = dom.childNodes[i];
      if (child && child !== dom && child !== f) {
        if (!f) {
          dom.appendChild(child);
        }
      }

      // just arr
      // let child;
      // const key = vchild.key;
      // if (key) {
      //   if (keyed[key]) {
      //     child = keyed[key];
      //     keyed[key] = undefined
      //   }
      // } else if (min < childrenLen) {
      //   for (let j = min; j < childrenLen; j++) {
      //     let c = children[j];
      //     if (c && isSameNodeType(c, vchild)) {
      //       child = c;
      //       children[j] = undefined;
      //       if (j === childrenLen - 1) childrenLen--;
      //       if (j === min) min++;
      //       break;
      //     }
      //   }
      // }
      // child = diffNode(child, vchild);
      // const f = dom.childNodes[i];

      // if (child && child !== dom && child !== f) {
      //   if (!f) {
      //     dom.appendChild(child);
      //   } else if (child === f.nextSibling) {
      //     removeNode(f);
      //   } else {
      //     dom.insertBefore(child, f)
      //   }
      // }
    }
  }
}

function diffAttribute(dom, vnode) {
  const now = {};
  const virAttr = vnode.attrs;
  // for(let i=0;i<dom.attributes.length;i++){
  //   const attr = dom.attributes[i];
  //   now[attr.name] = attr.value;
  // }
  for (const [k, v] of Object.entries(dom.attributes)) {
    now[k] = v;
  }

  // remove old diff new attr
  for (let k in now) {
    if (!(k in virAttr)) {
      setAttribute(dom, k, undefined);
    }
  }

  for (let k in virAttr) {
    if (now[k] !== virAttr[k]) {
      setAttribute(dom, k, virAttr[k]);
    }
  }
}

function diffComponent(dom, vnode) {
  let c = dom && dom._component;
  let oldDom = dom;

  if (c && c.constructor === vnode.tag) {
    // no component change
    setComponentProps(c, vnode.attrs); // check props
    dom = c.base;
  } else {
    if (c) {
      oldDom = null;
    }
    c = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(c, vnode.attrs);
    dom = c.base;
  }
  return dom;
}
